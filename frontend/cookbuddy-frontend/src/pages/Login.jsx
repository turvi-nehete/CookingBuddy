import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, rememberError } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email: form.email, password: form.password });
      navigate(location.state?.from?.pathname || "/profile", { replace: true });
    } catch (err) {
      setError(rememberError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card glass-panel">
        <div className="auth-illustration">
          <div className="login-doodle">Cook</div>
          <p className="eyebrow">Welcome back</p>
          <h1>Log in to your cozy kitchen.</h1>
        </div>

        <form onSubmit={handleSubmit} className="form-stack">
          {error ? <p className="error-banner">{error}</p> : null}

          <label className="field-label">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required className="field-input" />
          </label>

          <label className="field-label">
            Password
            <input name="password" type="password" value={form.password} onChange={updateField} required className="field-input" />
          </label>

          <div className="flex items-center justify-between gap-3 text-sm text-cocoa-500">
            <label className="flex items-center gap-2">
              <input name="remember" type="checkbox" checked={form.remember} onChange={updateField} />
              Remember me
            </label>
            <Link to="/login" className="font-bold text-accent-600">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full justify-center" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-cocoa-500">
            New here? <Link to="/register" className="font-black text-cocoa-900">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;