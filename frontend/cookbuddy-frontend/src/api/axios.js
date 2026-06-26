const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const ACCESS_TOKEN_KEY = "cookbuddy_access_token";
const REFRESH_TOKEN_KEY = "cookbuddy_refresh_token";

// A compact Axios-style client with request/response interceptors.
// It keeps the app buildable in this environment while following the same API shape used by Axios.
function createInterceptorStore() {
  return {
    handlers: [],
    use(onFulfilled, onRejected) {
      this.handlers.push({ onFulfilled, onRejected });
      return this.handlers.length - 1;
    },
  };
}

function normalizeHeaders(headers) {
  return Object.fromEntries(headers.entries());
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function refreshAccessToken() {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refresh) {
    throw new Error("No refresh token available.");
  }

  const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    throw new Error("Session expired. Please log in again.");
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
  return data.access;
}

const api = {
  interceptors: {
    request: createInterceptorStore(),
    response: createInterceptorStore(),
  },

  async request(config) {
    let nextConfig = {
      method: "GET",
      headers: {},
      retry: true,
      ...config,
    };

    for (const handler of api.interceptors.request.handlers) {
      if (handler.onFulfilled) {
        nextConfig = await handler.onFulfilled(nextConfig);
      }
    }

    const isFormData = nextConfig.data instanceof FormData;
    const headers = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...nextConfig.headers,
    };

    const response = await fetch(`${API_BASE_URL}${nextConfig.url}`, {
      method: nextConfig.method,
      headers,
      body: nextConfig.data ? (isFormData ? nextConfig.data : JSON.stringify(nextConfig.data)) : undefined,
    });

    const payload = await parseResponse(response);
    const result = {
      data: payload,
      status: response.status,
      headers: normalizeHeaders(response.headers),
      config: nextConfig,
    };

    if (response.status === 401 && nextConfig.retry) {
      const access = await refreshAccessToken();
      return api.request({
        ...nextConfig,
        retry: false,
        headers: {
          ...nextConfig.headers,
          Authorization: `Bearer ${access}`,
        },
      });
    }

    if (!response.ok) {
      const error = new Error(payload?.detail || payload?.message || "Something went wrong.");
      error.response = result;
      throw error;
    }

    let nextResult = result;
    for (const handler of api.interceptors.response.handlers) {
      if (handler.onFulfilled) {
        nextResult = await handler.onFulfilled(nextResult);
      }
    }

    return nextResult;
  },

  get(url, config = {}) {
    return api.request({ ...config, url, method: "GET" });
  },

  post(url, data, config = {}) {
    return api.request({ ...config, url, method: "POST", data });
  },

  put(url, data, config = {}) {
    return api.request({ ...config, url, method: "PUT", data });
  },

  delete(url, config = {}) {
    return api.request({ ...config, url, method: "DELETE" });
  },
};

// Every request automatically receives the current JWT access token.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

export { ACCESS_TOKEN_KEY, API_BASE_URL, REFRESH_TOKEN_KEY };
export default api;