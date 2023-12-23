import express from "express";
import {
  loadEmployees,
  loadEmployeesWithBirthdays,
  logOut,
  logOutAll,
  login,
  signup,
} from "../controllers/employee.controller";
import auth, { AuthRequest } from "../middleware/auth";
const rootRouter = express.Router();

rootRouter.post("/signup", signup);

rootRouter.get("/me", auth, async function (req: AuthRequest, res) {
  res.status(200).send(req.employee);
});

rootRouter.post("/login", login);

rootRouter.post("/logOut", auth, logOut);

rootRouter.post("/logOutAll", auth, logOutAll);

rootRouter.get("/employeesWithBirthdays", auth, loadEmployeesWithBirthdays);

rootRouter.get("/loadEmployees", loadEmployees);

export default rootRouter;
