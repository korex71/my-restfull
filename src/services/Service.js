import speakeasy from "speakeasy";
import qrcode from "qrcode";
import sendMail from '../services/sendMail'
import utils from '../helpers/Users'
class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.sendMail = sendMail.bind(this);
    this.getSecretAndBase64 = this.getSecretAndBase64.bind(this);
  }

  async getSecretAndBase64(user){
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

  async getUser(param){
    try {
      const {user, exists} = await utils.userExists(param)
      
      if(exists)
        return {
          error: false,
          statusCode: 202,
          user
        }
      
      return {
        error: true,
        statusCode: 404,
        user,
        message: 'User not exists.'
      }
    } catch (err) {
      console.error(err)

      return {
        error: true,
        statusCode: 500,
        message: error.message
      }
    }
  }

  async insert(data) {

    try {

      const userExists = await utils.userExists(data.email)
       
      if(userExists)
        return {
          error: true,
          message: "User already exists.",
          statusCode: 401,
          user: {
            created: false,
            data: null,
          }
        }
    
      const user = await this.model.create(data);

      if(user)
        return {
          error: false,
          statusCode: 201,
          user: {
            created: true,
            data: user,
          }
        }
    } catch (error) {

      console.error(error.message || error)

      return {
        error: true,
        message: error.message || "Unexpected error.",
        statusCode: 500,
        user: {
          created: false,
          data: null,
        },
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