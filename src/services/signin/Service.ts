import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import utils from "../../helpers/Users";
import { sendForgot } from "../../mail/send";
import User from "../../models/User";

class Service {
  private model = User;
  private sendMail = sendForgot;

  constructor() {
    this.authenticate = this.authenticate.bind(this);
  }

  private generateToken(id: string) {
    return jwt.sign({ id }, process.env.SESS_SECRET, {
      expiresIn: "1d", // 24h
    });
  }

  async authenticate(email: string, password: string) {
    const user = await this.model.findOne({ email });

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

    return {
      error: false,
      statusCode: 202,
      message: "Authenticated",
      data: {
        user,
        token: this.generateToken(user.id),
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.model.findOne({ email });

    if (!user)
      return {
        error: true,
        statusCode: 404,
        message: "User not found.",
        data: {},
      };

    if (new Date().getTime() > Number(user.passwordResetExpires))
      return {
        error: true,
        statusCode: 423,
        message:
          "Already exists a forgot password process, please verify your email",
        data: {},
      };

    const expireTime = new Date(new Date().getTime() + 1000 * (60 * 30)); // 30 min later

    const token = jwt.sign({ email }, process.env.SESS_SECRET, {
      expiresIn: "30m", // 30min
    });

    await this.model.findOneAndUpdate(
      { email },
      {
        passwordResetToken: token,
        passwordResetExpires: String(expireTime),
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

  async forgotSuccess(email: string, newPassword: string) {
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
      return {
        error: false,
        statusCode: 201,
        message: "Password changed successfully.",
        data: {
          email,
        },
      };
    } catch (err) {
      return {
        error: true,
        statusCode: 500,
        message: "Unexpected error.",
        data: {},
      };
    }
  }
}

export default new Service();
