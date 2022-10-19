import { Router } from "express";
import { categoriesListController, categoryCreateController, categoryListPropertiesController } from "../controllers/categories.controllers";
import { userAuthorizedMiddleware, validateAuthMiddleware } from "../middlewares/users.middlewares";

const routes = Router()

export const categoriesRoutes = () => {
  routes.post("", validateAuthMiddleware, userAuthorizedMiddleware, categoryCreateController);
  routes.get("", categoriesListController);
  routes.get("/:id/properties", categoryListPropertiesController)

  return routes
}
