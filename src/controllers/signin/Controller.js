class Controller {
  constructor(service) {
    this.service = service;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req, res) {
    const response = await this.service.authenticate(req.body);

    const { message, data, error, statusCode } = response;

    res.status(statusCode).send({ message, data });
  }

  async forgot(req, res) {
    const { email } = req.body;

    const response = await this.service.forgotPassword(email);

    const { message, data, error, statusCode } = response;

    res.status(statusCode).send({ message, data });
  }

  async forgotSuccess(req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      return {
        error: "Email or password is blank",
      };

    const response = await this.service.forgotSuccess({ email, newPassword });

    const { message, data, error, statusCode } = response;

    res.status(statusCode).send({ message, data });
  }
}

export default Controller;
