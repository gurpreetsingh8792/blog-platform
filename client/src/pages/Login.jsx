import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error, token } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(res)) {
      const to = location.state?.from || "/posts";
      navigate(to);
    }
  };

  if (token) {
    return (
      <div className="alert alert-info">
        You are already logged in. Go to <Link to="/posts">Posts</Link>.
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="card card-body">
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
          />

          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3">
            New user? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
