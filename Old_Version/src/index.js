import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./rtk/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { IconContext } from "react-icons";

const CLIENT_ID =
  "1010440021595-544rbh58fdt8rp8uvrv5jre8dem56sqf.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <IconContext.Provider value={{ size: "35" }}>
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </IconContext.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
