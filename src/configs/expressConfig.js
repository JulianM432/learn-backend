// Library
import { app } from "./express.js";
// Middlewares
import sintaxMiddleware from "../middlewares/sintaxJSON.js";
import endpointLogs from "../middlewares/endpointLogs.js";
import authMiddleware from "../middlewares/authMiddleware.js";
// ROUTES
import usersRoutes from "../routes/users.js";
import authRoutes from "../routes/auth.js";

export const configRoutes = () => {
  app.use("/users", usersRoutes);
  app.use("/auth", authRoutes);
};

export const configMiddlewares = () => {
  app.use(sintaxMiddleware);
  app.use(endpointLogs);
  app.use(authMiddleware);
};
