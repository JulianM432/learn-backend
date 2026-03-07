import connectDB from "./src/database/db.js";
import { serverOn } from "./configs/express.js";
import { configMiddlewares, configRoutes } from "./configs/expressConfig.js";

await connectDB();
configMiddlewares();
configRoutes();
serverOn();