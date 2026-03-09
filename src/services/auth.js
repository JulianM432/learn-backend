// Library
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
// Models
import User from "../models/users.js";
// Functions
import { validatePassword } from "../functions/validateData.js";

export const AuthService = {
  login: async (body) => {
    const user = await User.findOne({ email: body.email.toLowerCase() }).select("-__v").lean();
    if (!user) {
      throw { status: 404, message: "Usuario no encontrado" };
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw { status: 401, message: "Credenciales incorrectas" };
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const { name, lastName, email, role, isActive, _id } = user;
    return { userData: { name, lastName, email, role, isActive, _id }, token };
  },
  changePassword: async (idUser, body) => {
    try {
      const { currentPassword, newPassword } = body;
      if (!currentPassword || !newPassword) {
        throw { status: 400, message: "La contraseña actual y la nueva contraseña son requeridas" };
      }
      const user = await User.findById(idUser).lean();
      if (!user) {
        throw { status: 404, message: "Usuario no encontrado" };
      }
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw { status: 401, message: "La contraseña actual es incorrecta" };
      }
      const error = validatePassword(newPassword);
      if (error !== "") {
        throw { status: 400, message: error };
      }
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(idUser, { password: newPasswordHash });
    } catch (error) {
      throw error;
    }
  },
};
