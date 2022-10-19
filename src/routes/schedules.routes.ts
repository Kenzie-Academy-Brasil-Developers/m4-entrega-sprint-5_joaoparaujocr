import { Router } from "express";
import { schedulesCreateController, schedulesListPropertyController } from "../controllers/schedules.controllers";
import { userAuthorizedMiddleware, validateAuthMiddleware } from "../middlewares/users.middlewares";

const router = Router();

export const schedulesRoutes = () => {
  router.post("", validateAuthMiddleware, schedulesCreateController);
  router.get("/properties/:id", validateAuthMiddleware, userAuthorizedMiddleware, schedulesListPropertyController)

  return router
}