//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { Provider } from "react-redux";
import store from "./services/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
