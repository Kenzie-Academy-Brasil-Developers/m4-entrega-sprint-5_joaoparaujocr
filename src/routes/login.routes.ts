import { Router } from "express";
import { userLoginController } from "../controllers/users.controllers";

const router = Router();

export const loginRoutes = () => {
  router.post("", userLoginController);
  return router
}
