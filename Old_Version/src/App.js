import "./App.css";
import "./sass/main.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import * as URL from "./components/URLs";
import { NavBar } from "./layout/NavBar";
import RequireAccess from "./layout/RequireAccess";
import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { useEffect, useState } from "react";
import ThemeButton from "./components/ThemeButton";
import { Shap } from "./components/Shap";
import { ActiveEmail } from "./pages/ActiveEmail";
import { Project_Page } from "./pages/Project_Page";
import { EditorProject } from "./pages/EditorProject";

function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  let style_btn = "light";

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    console.log(JSON.parse(localStorage.getItem("theme")));
  }, [theme]);

  return (
    <div theme={`${theme}`}>
      <div className="App">
        <NavBar>
          <button
            className="btn_theme"
            onClick={() => {
              setTheme(!theme);
            }}
          >
            <span></span>
          </button>
          {/* <ThemeButton /> */}
        </NavBar>

        <Routes>
          <Route path={URL.Home} element={<Home />} />
          <Route path={URL.Register} element={<Register />} />
          <Route path={URL.Login} element={<Login />} />
          <Route
            path={URL.Resetpassword}
            element={
              <RequireAccess>
                <ResetPassword />
              </RequireAccess>
            }
          />
          <Route path={URL.ActiveEmail} element={<ActiveEmail />} />
          <Route path={URL.Projects} element={<Project_Page />} />
          <Route path={URL.EditorProject} element={<EditorProject />} />
        </Routes>
        {/* <Shap /> */}
        <ToastContainer theme="colored" hideProgressBar />
      </div>
    </div>
  );
}

export default App;
