import { Navigate, Route, Routes } from "react-router-dom";

import BoardPage from "./pages/board/Board.page";
import LoginPage from "./pages/login/Login.page";
import NotFoundPage from "./pages/notFound/NotFound.page";
import SignUpPage from "./pages/signUp/SignUp.page";

import { useEffect } from "react";
import { BOARD_PATH, LOGIN_PATH, SIGN_UP_PATH } from "./routes.constants";

function AppRoutes() {
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    sessionStorage.setItem("userTimezone", userTimezone);

    return () => {
      sessionStorage.removeItem("userTimezone");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={LOGIN_PATH} />} />
      <Route path={LOGIN_PATH} element={<LoginPage />} />
      <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
      <Route path={BOARD_PATH} element={<BoardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
