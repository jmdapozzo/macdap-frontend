import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/loading";
import reportWebVitals from "./reportWebVitals";
import Auth0ProviderWithRedirectCallback from "./auth/auth0-provider-with-redirect-callback";
import App from "./app";
import "./i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Auth0ProviderWithRedirectCallback>
          <App />
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
