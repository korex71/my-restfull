import AuthController from "../controllers/signup/Controller";
import UserController from "../controllers/signin/Controller";
import AuthMiddleware from "../middlewares/auth";
import AppController from "../controllers/appController";
import Validator from "../validators/Account";

export default (Server) => {
  // SignUp Routes
  Server.get(`/auth/users`, AuthController.getAll);
  Server.get("/auth/user/:param", AuthController.getUser);

  Server.post(`/auth/signup`, Validator.SignUp, AuthController.insert); //, AuthController.insert);

  Server.delete(`/auth/user/:user`, AuthController.delete);

  Server.post("/forgot_password", UserController.forgot);

  Server.post(
    "/forgot_password/:token",
    Validator.forgot,
    UserController.forgotSuccess
  );

  // SignIn || Authenticated Routes

  Server.post("/auth/signin", UserController.authenticate);

  Server.post(`/user`, AuthMiddleware, AppController.user);
};
