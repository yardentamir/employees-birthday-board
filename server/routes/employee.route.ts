import express from "express";
import * as c from "../controllers/employee.controller";
import auth, { AuthRequest } from "../middleware/auth";
const rootRouter = express.Router();

rootRouter.post("/signup", c.signup);

rootRouter.get("/me", auth, async function (req: AuthRequest, res) {
  res.status(200).send(req.employee);
});

rootRouter.post("/login", c.login);

rootRouter.post("/logOut", auth, c.logOut);

rootRouter.post("/logOutAll", auth, c.logOutAll);

rootRouter.get("/employeesWithBirthdays", auth, c.loadEmployeesWithBirthdays);

rootRouter.post("/logBirthdayWish", auth, c.logBirthdayWish);

rootRouter.get("/loadEmployeesWithWishes", auth, c.loadEmployeesWithWishes);

rootRouter.get("/loadEmployees", c.loadEmployees);

export default rootRouter;
