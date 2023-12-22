import express from "express";
import { login, signup } from "../controllers/employee.controller";

const rootRouter = express.Router();

rootRouter.post("/signup", signup);

// rootRouter.get("/me", auth, async (req, res) => {
//   res.status(200).send(req.employee);
// });

rootRouter.post("/login", login);

export default rootRouter;
