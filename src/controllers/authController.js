import express from 'express'

import signUpValidator from "../middlewares/signup";
import authenticateController from '../useCases/authenticate/authenticate.js';
import verifyCode from '../useCases/authenticate/verifyCode.js';
import User from '../useCases/createUser/index.js';
import forgotPasswordController from '../useCases/forgot_password/index.js'
import forgotPasswordCheck from '../useCases/forgot_password/check.js';
import forgotSetPassword from '../useCases/forgot_password/setPass.js'

const auth = express.Router();

auth.post("/signup", signUpValidator, async (req, res) => {
  
  const { user, email, password } = req.body;

  try {
    await User.createUser({user, email, password});
    return res.status(201).json({ email, user, message: "Verifique seu email" });

  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: err.message || "Unexpected error." });
  }
});

auth.post("/authenticate", authenticateController, verifyCode);


auth.post("/forgot_password", forgotPasswordController)
auth.get("/forgot_password/:token", forgotPasswordCheck, forgotSetPassword)

// Dev test routes

auth.route("/user")
  .get((req, res) => User.getUsers(res))
  .delete((req, res) => User.deleteUsers(res))


export default auth