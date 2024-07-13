import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routers/usersRouter.js";
import ordersRouter from "./routers/ordersRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Users API is running....");
});

app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
