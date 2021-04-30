import ISigninService from "../../interfaces/ISigninController";
import Service from "../../services/signin/Service";
import { Request, Response } from "express";

class Controller {
  service: ISigninService = Service;

  constructor() {
    this.authenticate = this.authenticate.bind(this);
    this.forgot = this.forgot.bind(this);
    this.forgotSuccess = this.forgotSuccess.bind(this);
  }

  private dispatch(res: Response, response) {
    const { message, data, error, statusCode } = response;

    if (error) res.status(statusCode).send({ error: message });

    res.status(statusCode).send({ message, data });
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(400).send({ error: "Email or password is blank" });

    const response = await this.service.authenticate(email, password);

    this.dispatch(res, response);
  }

  async forgot(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) res.status(400).send({ error: "Email is blank" });

    const response = await this.service.forgotPassword(email);

    this.dispatch(res, response);
  }

  async forgotSuccess(req: Request, res: Response) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      res.status(400).send({ error: "Email or password is blank" });

    const response = await this.service.forgotSuccess(email, newPassword);

    this.dispatch(res, response);
  }
}

export default new Controller();
