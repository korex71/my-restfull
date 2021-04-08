import Joi from '@hapi/joi';
import {getValidatorError} from '../helpers/validator'

class Validator {

  constructor(){
    this.SignUp = this.SignUp.bind(this)
  }

  rules = {
    email: Joi.string().email().required(),
    user: Joi.string().pattern(new RegExp('^[a-z-A-Z-0-9]{5,30}$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{6,30}$')).required()
  }

  options = {abortEarly: false}

  SignUp(req, res, next){

    const {email, user, password} = req.body;

    const schema = Joi.object({
      email: this.rules.email,
      user: this.rules.user,
      password: this.rules.password
    })

    const {error} = schema.validate({email, user, password}, this.options);

    if(error){
      const messages = getValidatorError(error, 'account.signup')
      return res.jsonBadRequest(null, null, {error: messages})
    }

    next()

  }

}

export default new Validator();