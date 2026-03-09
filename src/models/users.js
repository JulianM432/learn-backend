import { Schema } from "mongoose";
import { getRemoteDB } from "../database/db.js";

export const roles = ["admin", "user"];

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true },
);

export default getRemoteDB().model("User", UserSchema);
