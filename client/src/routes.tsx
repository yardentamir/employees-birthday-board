import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/Login.page";
import SignUpPage from "./pages/signUp/SignUp.page";
// import AuthRoute from "../routes/auth.route";

import { LOGIN_PATH, SIGN_UP_PATH } from "./routes.constants";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={LOGIN_PATH} />} />
      <Route path={LOGIN_PATH} element={<LoginPage />} />
      <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
      {/* <Route element={<AuthRoute />}>
          <Route path={DASHBOARD_PATH} element={<UpdateUser />} />
        </Route> */}
    </Routes>
  );
}

export default AppRoutes;
