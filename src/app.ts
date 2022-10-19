import "reflect-metadata"
import "express-async-errors"
import express from "express"
import AppRoutes from "./routes";
import { handleErrorMiddleware } from "./middlewares/users.middlewares";

const app = express();

app.use(express.json());

AppRoutes(app);

app.use(handleErrorMiddleware);

export default app