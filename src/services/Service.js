import speakeasy from "speakeasy";
import qrcode from "qrcode";
import sendMail from '../services/sendMail'

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.sendMail = sendMail.bind(this)
  }

  async #getSecretAndBase64(user){
    const secret = speakeasy.generateSecret({user}); // Generate2FA Secret
    const base64 = await qrcode.toDataURL(secret.otpauth_url) // Generate QR Base64

    return {
      ascii: secret.ascii,
      base64
    }
  }

  async getAll() {
    try {
      let users = await this.model.find({}, {email: 0});

      if(!users)
        return {
          error: true,
          statusCode: 404,
          message: "Don't have any users."
        }

      return {
        error: false,
        statusCode: 202,
        users
      };
      
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      }
    }
  }

  async insert(data) {

    try {

      if(await userModel.findOne({ email }))
        throw new Error("Email already exists.");
      if(await userModel.findOne({ user }))
        throw new Error("User already exists");

      const {ascii, base64} = await this.#getSecretAndBase64(user);

      data.twoFkey = ascii
    
      const user = await this.model.create(data)

      this.sendMail()

      if(user)
        return {
          error: false,
          message: "Verifique seu email.",
          user,
          base64
        }
    } catch (error) {
      console.error(error)
      return {
        error: true,
        statusCode: 500,
        message: error.message || "Unexpected error.",
        errors: error.errors
      }
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        item
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
  }

  async delete(user) {
    try {
      let item = await this.model.findOneAndRemove({user});

      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: "User not found"
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      };
    }
  }
}

export default Service;