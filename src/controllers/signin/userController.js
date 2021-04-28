import Controller from "./Controller";
import UserService from "../../services/signin/UserService";
import User from "../../models/User";

const userService = new UserService(User);
class UserController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new UserController(userService);
