import { Router } from "express";
import { propertiesListController, propertyCreateController } from "../controllers/properties.controllers";
import { userAuthorizedMiddleware, validateAuthMiddleware, validateSerializerMiddleware } from "../middlewares/users.middlewares";
import { propertyCreateSerializer } from "../serializers/properties";

const router = Router();

export const propertiesRoutes = () => {
  router.post("", validateAuthMiddleware, userAuthorizedMiddleware, validateSerializerMiddleware(propertyCreateSerializer), propertyCreateController)
  router.get("", propertiesListController);
  return router
}