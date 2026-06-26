import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <main className="auth-page">
      <section className="auth-card glass-panel">
        <div className="auth-illustration">
          <div className="login-doodle">Join</div>
          <p className="eyebrow">Create your account</p>
          <h1>Start a recipe collection that feels like you.</h1>
        </div>

        <form onSubmit={handleSubmit} className="form-stack">
          {error ? <p className="error-banner">{error}</p> : null}

          <label className="field-label">
            Name
            <input name="name" value={form.name} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label">
            Password
            <input name="password" type="password" value={form.password} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label">
            Confirm password
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} required className="field-input" />
          </label>

          <button type="submit" className="btn btn-primary btn-lg w-full justify-center" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-cocoa-500">
            Already have an account? <Link to="/login" className="font-black text-cocoa-900">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;