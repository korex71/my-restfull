class Controller {
  constructor(service) {
    this.service = service;
    this.authenticate = this.authenticate.bind(this);
    this.forgot = this.forgot.bind(this);
    this.forgotSuccess = this.forgotSuccess.bind(this);
  }

  #dispatch(res, response) {
    const { message, data, error, statusCode } = response;

    if (error) res.status(statusCode).send({ error: message });

    res.status(statusCode).send({ message, data });
  }

  async authenticate(req, res) {
    const response = await this.service.authenticate(req.body);

    this.#dispatch(res, response);
  }

  async forgot(req, res) {
    const { email } = req.body;

    const response = await this.service.forgotPassword(email);

    this.#dispatch(res, response);
  }

  async forgotSuccess(req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      res.status(400).send({ error: "Email or password is blank" });

    const response = await this.service.forgotSuccess({ email, newPassword });

    this.#dispatch(res, response);
  }
}

export default Controller;
