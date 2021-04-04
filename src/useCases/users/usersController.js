import express from "express";
import authMiddleware from "../../middlewares/auth";

const app = express.Router();

app.use(authMiddleware);

app.get("/user", authMiddleware, (req, res) => {
  res.json({ user: req.userId });
});

export default app;
