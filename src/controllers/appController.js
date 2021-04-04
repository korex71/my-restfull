import express from "express";
import authMiddleware from "../middlewares/auth";

const route = express.Router();

route.use(authMiddleware);

route.get("/user", (req, res) => {
  res.json({ user: req.userId });
});

export default route;
