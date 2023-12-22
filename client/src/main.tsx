import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
import store from "./store";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routers />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
