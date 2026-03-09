import jwt from "jsonwebtoken";
import publicRoutes from "../../configs/publicRoutes.json" with { type: "json" };
import privateRoutes from "../../configs/privateRoutes.json" with { type: "json" };
import User from "../models/users.js";

const authMiddleware = async (req, res, next) => {
  try {
    const publicPaths = publicRoutes;
    const privatePaths = privateRoutes;
    // Permitir acceso a rutas públicas
    const path = req.path.replace(/\/+$/, ""); // Eliminar barras diagonales finales
    if (publicPaths.some((route) => route.path === path && route.method === req.method)) {
      return next();
    }
    // Obtener el token de la cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Acceso denegado! Token invalido o expirado" });
    }
    // Verificar el token y obtener datos del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let userData = null;
    userData = await User.findOne({ _id: decoded._id, isActive: true })
      .select("name lastName email role")
      .lean();
    if (!userData) {
      res.clearCookie("token", { httpOnly: true, secure: true });
      return res.status(403).json({ message: "Token invalido o expirado" });
    }
    delete decoded.iat;
    delete decoded.exp;
    const roleData = privatePaths.find((r) => r.role === userData.role);
    const hasAccess = roleData.accessTo.some((route) => {
      const routeRegex = new RegExp(`^${route.path.replace(/:[a-zA-Z0-9_]+/g, "[^/]+")}$`);
      return routeRegex.test(path) && route.method.includes(req.method);
    });
    if (!hasAccess) {
      return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
    }
    req.user = userData;
    next();
  } catch (error) {
    console.error({ error: `${req.method} ${req.path} - ${error.message}` });
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(error.status || 401).json({ message: error.message || "Token invalido o expirado" });
  }
};

export default authMiddleware;
