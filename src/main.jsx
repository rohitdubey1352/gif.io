import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-zlw7derqgbapxjv1.us.auth0.com"
    clientId="o1qci6WaK1Jj3834RYeUwQxtQWBv1nLN"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
