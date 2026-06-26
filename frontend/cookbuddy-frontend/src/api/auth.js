// Authentication API calls mock client-side state so pages stay functional offline.
export function registerUser(payload) {
  const username = payload.email.split("@")[0];
  return Promise.resolve({
    access: "mock-access-token",
    refresh: "mock-refresh-token",
    user: {
      id: "chef-123",
      username: username,
      name: payload.name || username,
      email: payload.email,
    },
  });
}

export function loginUser(payload) {
  const username = payload.email.split("@")[0];
  return Promise.resolve({
    access: "mock-access-token",
    refresh: "mock-refresh-token",
    user: {
      id: "chef-123",
      username: username,
      name: username,
      email: payload.email,
    },
  });
}

export function refreshToken() {
  return Promise.resolve({
    access: "mock-new-access-token",
  });
}

export function getProfile() {
  return Promise.resolve({
    id: "chef-123",
    username: "cookbuddy_chef",
    name: "CookBuddy Chef",
    email: "chef@cookbuddy.ai",
  });
}