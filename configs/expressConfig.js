// Library
import { app } from "./express.js";
// Middlewares
import sintaxMiddleware from "../src/middlewares/sintaxJSON.js";
import endpointLogs from "../src/middlewares/endpointLogs.js";
import authMiddleware from "../src/middlewares/authMiddleware.js";
// ROUTES
import usersRoutes from "../src/routes/users.js";
import authRoutes from "../src/routes/auth.js";

export const configRoutes = () => {
  app.use("/users", usersRoutes);
  app.use("/auth", authRoutes);
};

export const configMiddlewares = () => {
  app.use(sintaxMiddleware);
  app.use(endpointLogs);
  app.use(authMiddleware);
};
