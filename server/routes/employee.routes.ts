import express from "express";
import * as c from "../controllers/employee.controller";
import validateReq from "../middleware/validateReq.middleware";
import * as v from "../validators";
import auth from "../middleware/auth.middleware";
const rootRouter = express.Router();

rootRouter.post("/signup", validateReq(v.signup), c.signup);

rootRouter.post("/login", validateReq(v.login), c.login);

rootRouter.post("/logOut", auth, c.logOut);

rootRouter.post("/logOutAll", auth, c.logOutAll);

rootRouter.get("/me", auth, c.me);

rootRouter.get("/loadEmployees", c.loadEmployees);

rootRouter.get("/employeesWithBirthdays", auth, c.loadEmployeesWithBirthdays);

rootRouter.post(
  "/logBirthdayWish",
  auth,
  validateReq(v.birthdayWish),
  c.logBirthdayWish
);

rootRouter.get("/loadEmployeesWithWishes", c.loadEmployeesWithWishes);

export default rootRouter;
