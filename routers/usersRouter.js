import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers.js";
import {
  checkId,
  checkUser,
  checkUserBeforeCreate,
  checkBeforeUpdate,
  modifyBody,
} from "../middlewares/usersMiddlewares.js";
import { checkIdV, postBodyV, putBodyV } from "../validators/userValidators.js";
const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", checkIdV, checkId, checkUser, getUserById);
usersRouter.post("/", postBodyV, checkUserBeforeCreate, modifyBody, createUser);
usersRouter.put(
  "/:id",
  checkIdV,
  putBodyV,
  checkBeforeUpdate,
  checkId,
  checkUser,
  updateUser
);
usersRouter.delete("/:id", checkIdV, checkId, checkUser, deleteUser);

export default usersRouter;
