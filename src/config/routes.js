import UserController from '../controllers/userController';

export default (server) => {

  // POST ROUTES
  server.get(`/auth/users`, UserController.getAll);
  server.post(`/auth/signup`, UserController.insert);
  // server.put(`/auth/:user`, UserController.update);
  server.delete(`/auth/user/:user`, UserController.delete);

}