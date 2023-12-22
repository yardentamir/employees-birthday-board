import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        h1 {
          color: black;
        }
      `,
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100dvh",
          padding: "20px",
        },
      },
    },
  },
});

export default theme;
