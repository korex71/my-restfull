import bcrypt from 'bcryptjs'

class Service {
  constructor(model) {
    this.model = model;
    this.authenticate = this.authenticate.bind(this);
  }

  #generateToken(id){
    return jwt.sign({ id }, process.env.SESS_SECRET, {
      expiresIn: "1d", // 24h
    });
  }

  async authenticate(data){
    const { email, password } = data;
  
    const user = await this.model.findOne({ email }).select("+password");
  
    if (!user) 
      return {
        error: true,
        statusCode: 404,
        message: "User not found.",
        data: {}
      }
  
    const match = await bcrypt.compare(password, user.password)

    if(!match)
      return {
        error: true,
        statusCode: 401,
        message: "Password not match.",
        data: {}
      }
    
    delete user.password;
    
    return {
      error: false,
      statusCode: 202,
      message: "Authenticated",
      data: {
        user,
        token: this.#generateToken(user.id)
      }
    }

  }
  
}

export default Service;