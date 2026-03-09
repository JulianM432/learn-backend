import User from "../models/users.js";
import {
  getSchemaPaths,
  validateEmail,
  validatePassword,
  validateFields,
} from "../functions/validateData.js";
import { formatUser } from "../functions/formatData.js";

const validateUser = (body) => {
  const errorFields = validateFields(body, getSchemaPaths(User.schema));
  if (errorFields !== "") {
    throw { status: 400, message: errorFields };
  }
  const errorEmail = validateEmail(body.email);
  if (errorEmail !== "") {
    throw { status: 400, message: errorEmail };
  }
  const errorPassword = validatePassword(body.password);
  if (errorPassword !== "") {
    throw { status: 400, message: errorPassword };
  }
};

export const UsersServices = {
  createUser: async (data) => {
    validateUser(data);
    const user = User.create(data);
    return formatUser(user);
  },
  getUsers: async (body) => {
    const { name, lastName, isActive, email, role } = body;
    const page = parseInt(body?.page) || 1;
    const limit = parseInt(body?.limit) || 10;
    const skip = (page - 1) * limit;
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    if (lastName) {
      query.lastName = { $regex: new RegExp(lastName, "i") };
    }
    if (isActive !== undefined && isActive !== null) {
      query.isActive = isActive;
    }
    if (email) {
      query.email = email;
    }
    if (role) {
      query.role = role;
    }
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(skip).limit(limit).lean(),
    ]);
    if (!users || users.length === 0) {
      throw { status: 404, message: "Users not found" };
    }
    return { data: users, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  },
  getOwnUserData: async (idUser) => {
    const user = await User.findById(idUser).lean();
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return formatUser(user);
  },
  updateUser: async (id, data) => {
    const user = User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return formatUser(user);
  },
  updateOwnUserData: async (idUser, data) => {
    const updatedUser = await User.findOneAndUpdate({ _id: idUser, isActive: true }, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw { status: 404, message: "User not found" };
    }
    return formatUser(updatedUser);
  },
  activateUser: async (id) => {
    const user = await User.findOneAndUpdate({ _id: id, isActive: false }, { isActive: true }, { new: true });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return { message: "User activated" };
  },
  deactivateUser: async (id) => {
    const user = await User.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false }, { new: true });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return { message: "User deactivated" };
  },
};
