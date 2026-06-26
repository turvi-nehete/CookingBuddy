import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChefHatDoodle, SparklesDoodle, CarrotDoodle } from "../components/Doodles";

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
    <main className="auth-page bg-cream-50/50">
      {/* Decorative doodles floating around the auth page */}
      <CarrotDoodle className="absolute left-[15%] top-20 text-sage-300 w-10 h-10 rotate-[-12deg] doodle-float hidden lg:block" />
      <SparklesDoodle className="absolute right-[15%] bottom-20 text-butter-500 w-8 h-8 rotate-[15deg] doodle-float hidden lg:block" />

      <section className="auth-card bg-white border border-sage-200/50">
        <div className="auth-illustration">
          <div className="login-doodle">
            <ChefHatDoodle className="w-12 h-12 text-sage-500" />
          </div>
          <span className="eyebrow w-fit">Welcome back</span>
          <h1 className="mt-2 font-heading font-bold text-cocoa-900 leading-tight">
            Log in to your cozy recipe book.
          </h1>
          <p className="mt-4 text-sm text-cocoa-500">
            Your saved flavors and cooking plans are waiting for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-stack font-heading">
          {error ? <p className="error-banner text-sm">{error}</p> : null}

          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Email address</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              required
              className="field-input font-body text-sm"
              placeholder="e.g. chef@cookbuddy.ai"
            />
          </label>

          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              required
              className="field-input font-body text-sm"
              placeholder="••••••••"
            />
          </label>

          <div className="flex items-center justify-between gap-3 text-xs font-body font-semibold text-cocoa-500">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={updateField}
                className="rounded border-sage-300 text-sage-500 focus:ring-sage-500"
              />
              Remember me
            </label>
            <Link to="/login" className="text-accent-500 hover:text-accent-600 transition">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full justify-center text-base mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-xs font-body font-semibold text-cocoa-500 mt-2">
            New here?{" "}
            <Link to="/register" className="text-sage-600 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;