import { AuthService } from "../services/auth.js";

export const AuthController = {
  login: async (req, res) => {
    try {
      const { userData, token } = await AuthService.login(req.body);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 43200000, // 12 hs * 60 m * 60 s * 1000 ms,
      });
      res.status(201).json(userData);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(200).json({ message: "Sesión finalizada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  changePassword: async (req, res) => {
    try {
      await AuthService.changePassword(req.user._id, req.body);
      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ message: error.message });
    }
  },
};
