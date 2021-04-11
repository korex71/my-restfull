import AuthController from "../controllers/signup/userController";
import UserController from "../controllers/signin/userController";
import Validator from "../validators/Account";

export default (server) => {
  // SignUp Routes
  server.get(`/auth/users`, AuthController.getAll);
  server.post(`/auth/signup`, Validator.SignUp, AuthController.insert); //, AuthController.insert);
  server.delete(`/auth/user/:user`, AuthController.delete);
  server.get("/auth/user/:param", AuthController.getUser);

  // SignIn Routes

  server.post("/auth/signin", UserController.authenticate);
  // server.put(`/auth/:user`, AuthController.update);

  // Forgot Routes
  // server.get("/forgot_password/:token", UserController.forgot);
};
