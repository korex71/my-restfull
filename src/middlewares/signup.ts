import Joi from "@hapi/joi";
import { getValidatorError } from "../helpers/validator";

const rules = {
  email: Joi.string().email().required(),
  user: Joi.string().min(3).max(12).alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
};

const options = { abortEarly: false };

export default (req, res, next) => {
  const { user, email, password } = req.body;
  if (!user || !email || !password) {
    return res.jsonBadRequest(null, null, {
      error: "Verifique os campos email, usuario e senha.",
    });
  }

  const schema = Joi.object({
    email: rules.email,
    user: rules.user,
    password: rules.password,
  });

  const { error } = schema.validate({ email, user, password }, options);
  if (error) {
    const messages = getValidatorError(error, "account.signup");
    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};
