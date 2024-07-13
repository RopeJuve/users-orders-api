import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  checkActivity,
} from "../controllers/usersControllers.js";
import {
  checkUser,
  checkUserBeforeCreate,
  modifyBody,
  checkValidation,
} from "../middlewares/usersMiddlewares.js";
import { checkIdV, postBodyV, putBodyV } from "../validators/userValidators.js";
const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", checkIdV, checkValidation, checkUser, getUserById);
usersRouter.get(
  "/:id/orders",
  checkIdV,
  checkValidation,
  checkUser,
  getUserOrders
);
usersRouter.post(
  "/",
  postBodyV,
  checkValidation,
  checkUserBeforeCreate,
  modifyBody,
  createUser
);
usersRouter.put(
  "/:id/check-inactive",
  checkIdV,
  checkValidation,
  checkUser,
  checkActivity
);
usersRouter.put(
  "/:id",
  checkIdV,
  putBodyV,
  checkValidation,
  checkUser,
  updateUser
);
usersRouter.delete("/:id", checkIdV, checkValidation, checkUser, deleteUser);

export default usersRouter;
