import express from "express";

import response from "../middlewares/response"; // Custom response middleware
import setRoutes from "./routes";
// import authController from '../controllers/authController.js';
// import appController from '../controllers/appController.js';
import morgan from "morgan";

const port = process.env.PORT || 4444;

const server = express();

server.use(morgan("dev")); // Logger
server.use(response);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
setRoutes(server);

server.listen(port, () => console.log("🔥 Server started at:", port));

// server.use("/auth", authController)

// server.use(appController)

export default server;
