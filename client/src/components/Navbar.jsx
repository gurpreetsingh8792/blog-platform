import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/auth/authSlice";
import { Offcanvas } from "bootstrap";

export default function Navbar() {
  const { token, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    const el = document.getElementById("mobileNav");
    if (!el) return;
    const instance = Offcanvas.getInstance(el);
    if (instance) instance.hide();
  };

  const onLogout = () => {
    dispatch(logout());
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/posts">
          Blog Platform
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileNav"
          aria-controls="mobileNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse d-none d-lg-flex">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts">
                Posts
              </NavLink>
            </li>

            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/new">
                  New Post
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Hi, {user?.name || "User"}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        <div
          className="offcanvas offcanvas-end text-bg-dark d-lg-none"
          tabIndex="-1"
          id="mobileNav"
          aria-labelledby="mobileNavLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileNavLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/posts"
                  onClick={closeMobileMenu}
                >
                  Posts
                </NavLink>
              </li>

              {token && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/new"
                    onClick={closeMobileMenu}
                  >
                    New Post
                  </NavLink>
                </li>
              )}

              <hr className="border-secondary" />

              {!token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/register"
                      onClick={closeMobileMenu}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className="text-secondary mb-2">
                    Hi, <span className="text-white">{user?.name}</span>
                  </div>

                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
