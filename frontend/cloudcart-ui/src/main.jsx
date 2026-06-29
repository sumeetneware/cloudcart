import React, {
  useMemo,
  useState,
} from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { getTheme } from "./theme";

function Root() {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") ||
      "light"
  );

  const toggleTheme = () => {
    const nextMode =
      mode === "light"
        ? "dark"
        : "light";

    localStorage.setItem(
      "theme",
      nextMode
    );

    setMode(nextMode);
  };

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App
              mode={mode}
              toggleTheme={toggleTheme}
            />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);