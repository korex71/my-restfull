import UserController from '../controllers/userController';
import AuthController from '../controllers/signin/userController'
import Validator from '../validators/Account'

export default (server) => {
  // SignUp Routes
  server.get(`/auth/users`, UserController.getAll);
  server.post(`/auth/signup`, Validator.SignUp, UserController.insert)//, UserController.insert);
  server.delete(`/auth/user/:user`, UserController.delete);
  server.get('/auth/user/:param', UserController.getUser);

  // SignIn Routes

  server.post('/auth/signin', AuthController.authenticate)
  


  // server.put(`/auth/:user`, UserController.update);
}