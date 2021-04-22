import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "./sendMail";
import utils from "../../helpers/Users";

class Service {
  constructor(model) {
    this.model = model;
    this.authenticate = this.authenticate.bind(this);
    this.sendMail = sendMail;
  }

  #generateToken(id) {
    return jwt.sign({ id }, process.env.SESS_SECRET, {
      expiresIn: "1d", // 24h
    });
  }

  async authenticate(data) {
    const { email, password } = data;

    const user = await this.model.findOne({ email }).select("+password");

    if (!user)
      return {
        error: true,
        statusCode: 404,
        message: "User not found.",
        data: {},
      };

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return {
        error: true,
        statusCode: 401,
        message: "Password not match.",
        data: {},
      };

    delete user.password;

    return {
      error: false,
      statusCode: 202,
      message: "Authenticated",
      data: {
        user,
        token: this.#generateToken(user.id),
      },
    };
  }

  async forgotPassword(email) {
    const user = await this.model.findOne({ email }).select("+password");

    if (!user)
      return {
        error: true,
        statusCode: 404,
        message: "User not found.",
        data: {},
      };

    if (new Date().getTime() > user.passwordResetExpires)
      return {
        error: true,
        statusCode: 423,
        message:
          "Already exists a forgot password process, please verify your email",
        data: { email },
      };

    const expireTime = new Date(new Date().getTime() + 1000 * (60 * 30)); // 30 min later

    const token = jwt.sign({ email }, process.env.SESS_SECRET, {
      expiresIn: "30m", // 30min
    });

    await this.model.findOneAndUpdate(
      { email },
      {
        passwordResetToken: token,
        passwordResetExpires: expireTime,
      }
    );

    await this.sendMail({ user: user.user, email, token });

    return {
      error: false,
      statusCode: 202,
      message: "Token created",
      data: {},
    };
  }

  async forgotSuccess(props) {
    const { email, newPassword } = props;

    const verify = await utils.userExists(email);

    if (!verify.exists)
      return {
        error: true,
        statusCode: 404,
        message: "User not found.",
        data: {},
      };

    try {
      await this.model.findOneAndUpdate({ email }, { password: newPassword });
    } catch (err) {
      return {
        error: true,
        statusCode: 500,
        message: "Unexpected error.",
        data: {},
      };
    }

    return {
      error: false,
      statusCode: 201,
      message: "Password changed successfully.",
      data: {
        email,
        user,
      },
    };
  }
}

export default Service;
