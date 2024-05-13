import { Link } from "react-router-dom";
import { Home, Login, Projects, Register, Sensors } from "../components/URLs";
import { ThemeMode } from "../components/LocalStorage";

export const NavBar = (props) => {
  const handleCollapse = () => {
    console.log("handleCollapse");
    var navList = document.querySelectorAll("nav .container-fluid div");
    var btn = document.getElementById("navbarBtn");
    navList?.forEach((item) => {
      item.classList.remove("show");
    });
    btn.classList.add("collapsed");
    btn.setAttribute("aria-expanded", "false");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 end-0 start-0"
        data-bs-theme="dark"
        id="navbarNav"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={Home}>
            Navbar
          </Link>
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
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link
                  onClick={handleCollapse}
                  className="nav-link"
                  to={Projects}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={handleCollapse}
                  className="nav-link"
                  to={Sensors}
                >
                  Sensors
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">{props.children}</li>
              <li className="nav-item">
                <Link onClick={handleCollapse} className="nav-link" to={Login}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={handleCollapse}
                  className="nav-link"
                  to={Register}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
