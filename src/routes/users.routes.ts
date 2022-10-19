import { Router } from "express";
import { userCreateController, userDeleteController, usersListController, userUpdateController } from "../controllers/users.controllers";
import { idIsValidMiddleware, userAlreadyExistsMiddleware, userAuthorizedMiddleware, userIsAdmMiddleware, validateAuthMiddleware, validateSerializerMiddleware } from "../middlewares/users.middlewares";
import { createUserSerializer } from "../serializers";
import { userUpdateSerializer } from "../serializers/users";

const router = Router();

export const usersRoutes = () => {
  router.post("", userAlreadyExistsMiddleware, validateSerializerMiddleware(createUserSerializer), userCreateController);
  router.get("", validateAuthMiddleware, userAuthorizedMiddleware, usersListController);
  router.patch("/:id", validateAuthMiddleware, userIsAdmMiddleware, idIsValidMiddleware, validateSerializerMiddleware(userUpdateSerializer), userUpdateController)
  router.delete("/:id", validateAuthMiddleware, userAuthorizedMiddleware, idIsValidMiddleware, userDeleteController);
  return router
}
