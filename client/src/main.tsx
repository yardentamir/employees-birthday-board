import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  </BrowserRouter>
);
