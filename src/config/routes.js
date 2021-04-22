import AuthController from "../controllers/signup/userController";
import UserController from "../controllers/signin/userController";
import AuthMiddleware from "../middlewares/auth";
import AppController from "../controllers/appController";
import Validator from "../validators/Account";

export default (server) => {
  // SignUp Routes
  server.get(`/auth/users`, AuthController.getAll);
  server.get("/auth/user/:param", AuthController.getUser);

  server.post(`/auth/signup`, Validator.SignUp, AuthController.insert); //, AuthController.insert);

  server.delete(`/auth/user/:user`, AuthController.delete);

  server.post("/forgot_password", UserController.forgot);

  server.post(
    "/forgot_password/:token",
    Validator.forgot,
    UserController.forgotSuccess
  );

  // SignIn || Authenticated Routes

  server.post("/auth/signin", UserController.authenticate);

  server.post(`/user`, AuthMiddleware, AppController.user);
};
