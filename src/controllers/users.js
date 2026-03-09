import { UsersServices } from "../services/users.js";

export const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await UsersServices.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  getOwnUserData: async (req, res) => {
    try {
      const user = await UsersServices.getOwnUserData(req.user._id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  updateOwnUserData: async (req, res) => {
    try {
      const user = await UsersServices.updateOwnUserData(req.user._id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const body = {
        page: req?.query?.page,
        limit: req?.query?.limit,
        name: req?.query?.name,
        lastName: req?.query?.lastName,
        email: req?.query?.lastName,
      };
      const result = await UsersServices.getUsers(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  activateUser: async (req, res) => {
    try {
      await UsersServices.activateUser(req.params.id);
      res.status(200).json({ message: "Usuario activado correctamente" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await UsersServices.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
  deactivateUser: async (req, res) => {
    try {
      await UsersServices.deactivateUser(req.params.id);
      res.status(200).json({ message: "Usuario desactivado correctamente" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
  },
};
