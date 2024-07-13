import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersControllers.js";
import {
  checkOrderIdV,
  postOrderV,
  putOrderV,
} from "../validators/orderValidators.js";
import {
  checkValidation,
  checkOrderExists,
  checkBeforeCreateOrder,
} from "../middlewares/ordersMiddlewares.js";

const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);
ordersRouter.get(
  "/:id",
  checkOrderIdV,
  checkValidation,
  checkOrderExists,
  getOrderById
);
ordersRouter.post(
  "/",
  postOrderV,
  checkValidation,
  checkBeforeCreateOrder,
  createOrder
);
ordersRouter.put(
  "/:id",
  checkOrderIdV,
  putOrderV,
  checkValidation,
  checkOrderExists,
  updateOrder
);
ordersRouter.delete(
  "/:id",
  checkOrderIdV,
  checkValidation,
  checkOrderExists,
  deleteOrder
);

export default ordersRouter;
