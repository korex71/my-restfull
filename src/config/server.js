import express from "express";

import response from "../middlewares/response"; // Custom response middleware

// import authController from '../controllers/authController.js';
// import appController from '../controllers/appController.js';
import morgan from "morgan";

import setRoutes from './routes'

const server = express();

server.use(morgan('dev'));
server.use(response)
server.use(express.json());
server.use(express.urlencoded({extended: false}))

setRoutes(server)


// server.use("/auth", authController)

// server.use(appController)

export default server;