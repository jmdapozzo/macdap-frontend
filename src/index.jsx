import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import Loading from "./components/loading";
import reportWebVitals from "./reportWebVitals";
import App from "./app";
import "./i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
