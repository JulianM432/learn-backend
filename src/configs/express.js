import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { printBox } from "../functions/printBox.js";

export const app = express();
// Configs de las variables
const FRONTEND_URL = process.env.FRONTEND_URL || "localhost:3000";
// DISABLE HEADERS
app.disable("x-powered-by");
app.disable("etag");
// Parser to JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`http://${FRONTEND_URL}`, `https://${FRONTEND_URL}`],
    credentials: true,
  }),
);

export const serverOn = () => {
  app.listen(process.env.PORT, () => {
    let printArray = [
      {
        label: "Server",
        value: `http://localhost:${process.env.PORT}`,
      },
    ];
    printBox(printArray);
  });
};
