import speakeasy from "speakeasy";
import qrcode from "qrcode";
import utils from "../../helpers/Users";
import User from "../../models/User";
import { sendEmailQR } from "../../mail/send";
import { IInsertUser } from "../../interfaces/ISignupService";

class Service {
  model = User;
  sendMail = sendEmailQR;
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getSecretAndBase64 = this.getSecretAndBase64.bind(this);
  }

  async getSecretAndBase64(user: string) {
    const secret = speakeasy.generateSecret({ user }); // Generate2FA Secret
    const base64 = await qrcode.toDataURL(secret.otpauth_url); // Generate QR Base64

    return {
      ascii: secret.ascii,
      base64,
    };
  }

  async getAll() {
    try {
      const users = await this.model.find({});

      return {
        erorr: false,
        statusCode: 200,
        message: "",
        users,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: "Unexpected error",
        users: undefined,
      };
    }
  }

  async getUser(param: string) {
    try {
      const { user, exists } = await utils.userExists(param);

      if (exists)
        return {
          error: false,
          statusCode: exists ? 200 : 404,
          user,
        };
    } catch (err) {
      console.error(err.message || err);

      return {
        error: true,
        statusCode: 500,
        message: err.message || "Unexpected error.",
      };
    }
  }

  async insert(data: IInsertUser) {
    try {
      const userExists = await utils.userExists(data.email);

      if (userExists.exists)
        return {
          error: true,
          message: "User already exists.",
          statusCode: 401,
          user: {
            created: false,
            data: null,
          },
        };

      const user = await this.model.create(data);

      if (user)
        return {
          error: false,
          statusCode: 201,
          user: {
            created: true,
            data: user,
          },
        };
    } catch (error) {
      console.error(error.message || error);

      return {
        error: true,
        message: "Internal error",
        statusCode: 500,
        user: {
          created: false,
          data: null,
        },
      };
    }
  }

  async update(id: string, data: []) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
      };
    }
  }

  async delete(user: string) {
    try {
      const item = await this.model.findOneAndRemove({ user });

      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: "User not found",
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
      };
    }
  }
}

export default new Service();
