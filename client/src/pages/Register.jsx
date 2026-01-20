import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const res = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(res)) {
      setMsg("Registered successfully. Please login.");
      setTimeout(() => navigate("/login"), 800);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Create Account</h3>

        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="card card-body">
          <label className="form-label">Username</label>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />

          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={5}
          />

          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Creating..." : "Register"}
          </button>

          <div className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
