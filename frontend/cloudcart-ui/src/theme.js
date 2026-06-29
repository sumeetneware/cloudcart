import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#2563eb",
      },

      secondary: {
        main: "#7c3aed",
      },
    },

    shape: {
      borderRadius: 16,
    },

    typography: {
      fontFamily:
        "'Inter', 'Roboto', sans-serif",

      h2: {
        fontWeight: 700,
      },

      h3: {
        fontWeight: 700,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  });