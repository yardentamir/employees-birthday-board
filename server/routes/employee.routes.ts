import express from "express";
import * as c from "../controllers/employee.controller";
import auth from "../middleware/auth";
const rootRouter = express.Router();

rootRouter.post("/signup", c.signup);

rootRouter.get("/me", auth, c.me);

rootRouter.post("/login", c.login);

rootRouter.post("/logOut", auth, c.logOut);

rootRouter.post("/logOutAll", auth, c.logOutAll);

rootRouter.get("/employeesWithBirthdays", auth, c.loadEmployeesWithBirthdays);

rootRouter.post("/logBirthdayWish", auth, c.logBirthdayWish);

rootRouter.get("/loadEmployeesWithWishes", c.loadEmployeesWithWishes);

rootRouter.get("/loadEmployees", c.loadEmployees);

export default rootRouter;
