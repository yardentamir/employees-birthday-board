import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Routers from "./routes";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  </HashRouter>
);
