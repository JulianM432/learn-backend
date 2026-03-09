import { Router } from "express";
import { UserController } from "../controllers/users.js";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/own", UserController.getOwnUserData);
router.patch("/own", UserController.updateOwnUserData);

router.post("/:id/activate", UserController.activateUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deactivateUser);

export default router;
