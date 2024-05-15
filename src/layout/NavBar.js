import { Link } from "react-router-dom";
import { routes, apis } from "../components/URLs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../rtk/slices/authSlice";
import { clearUser } from "../rtk/slices/usersSlice";

export const NavBar = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleCollapse = () => {
    var navList = document.querySelectorAll("nav .container-fluid div");
    var btn = document.getElementById("navbarBtn");
    navList?.forEach((item) => {
      item.classList.remove("show");
    });
    btn.classList.add("collapsed");
    btn.setAttribute("aria-expanded", "false");
  };

  const handleLogout = () => {
    var navList = document.querySelectorAll("nav .container-fluid div");
    var btn = document.getElementById("navbarBtn");
    navList?.forEach((item) => {
      item.classList.remove("show");
    });
    btn.classList.add("collapsed");
    btn.setAttribute("aria-expanded", "false");

    dispatch(logout());
    dispatch(clearUser());
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 end-0 start-0"
        data-bs-theme="dark"
        id="navbarNav"
      >
        <h2
          className="text_color"
          style={{ padding: "0", margin: "0 0 0 1.5rem" }}
        >
          LMS
        </h2>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            id="navbarBtn"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">{props.children}</li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      handleLogout();
                      document.documentElement.style.setProperty(
                        "--selctor-top",
                        `4.5rem`
                      );
                    }}
                    className="nav-link"
                    to={routes.Login}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      onClick={handleCollapse}
                      className="nav-link"
                      to={routes.Login}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={handleCollapse}
                      className="nav-link"
                      to={routes.Register}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
