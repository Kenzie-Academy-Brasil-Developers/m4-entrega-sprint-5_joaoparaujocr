import { Express } from "express";
import { categoriesRoutes } from "./categories.routes";
import { loginRoutes } from "./login.routes";
import { propertiesRoutes } from "./properties.routes";
import { usersRoutes } from "./users.routes";
import { schedulesRoutes } from "./schedules.routes";

const AppRoutes = (app: Express) => {
  app.use("/users", usersRoutes());
  app.use("/login", loginRoutes());
  app.use("/categories", categoriesRoutes());
  app.use("/properties", propertiesRoutes());
  app.use("/schedules", schedulesRoutes())
}

export default AppRoutes
