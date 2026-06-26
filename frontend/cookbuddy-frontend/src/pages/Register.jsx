import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChefHatDoodle, SparklesDoodle, CarrotDoodle } from "../components/Doodles";

function Register() {
  const navigate = useNavigate();
  const { register, rememberError } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({ name: form.name, email: form.email, password: form.password, password2: form.confirmPassword });
      navigate("/profile");
    } catch (err) {
      setError(rememberError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page bg-cream-50/50">
      {/* Decorative doodles floating around the auth page */}
      <CarrotDoodle className="absolute left-[12%] bottom-24 text-sage-300 w-10 h-10 rotate-[20deg] doodle-float hidden lg:block" />
      <SparklesDoodle className="absolute right-[12%] top-24 text-butter-500 w-8 h-8 rotate-[-12deg] doodle-float hidden lg:block" />

      <section className="auth-card bg-white border border-sage-200/50">
        <div className="auth-illustration">
          <div className="login-doodle">
            <ChefHatDoodle className="w-12 h-12 text-sage-500" />
          </div>
          <span className="eyebrow w-fit">Create your account</span>
          <h1 className="mt-2 font-heading font-bold text-cocoa-900 leading-tight">
            Start a recipe notebook that is uniquely yours.
          </h1>
          <p className="mt-4 text-sm text-cocoa-500">
            Write down your recipes, organize favorites, and enjoy cooking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-stack font-heading">
          {error ? <p className="error-banner text-sm">{error}</p> : null}

          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Full Name</span>
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              required
              className="field-input font-body text-sm"
              placeholder="e.g. Chef CookBuddy"
            />
          </label>

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

          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Confirm Password</span>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={updateField}
              required
              className="field-input font-body text-sm"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full justify-center text-base mt-2"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-xs font-body font-semibold text-cocoa-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-sage-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;