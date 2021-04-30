import express from "express";
import utils from "../../helpers/Users";
import Service from "../../services/signup/Service";

class Controller {
  service = Service;

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async getAll(req: express.Request, res: express.Response) {
    const response = await this.service.getAll();

    return res.status(response.statusCode).send(response);
  }

  async insert(req: express.Request, res: express.Response) {
    const { email, user, password } = req.body;

    const { ascii, base64 } = await utils.getSecretAndBase64(user);

    const response = await this.service.insert({
      email,
      user,
      password,
      twoFactors: ascii,
    });

    if (response.error) return res.status(response.statusCode).send(response);

    await this.service.sendMail({ email, user, base64 });

    return res.status(response.statusCode).send(response);
  }

  async update(req: express.Request, res: express.Response) {
    const { id } = req.params;

    let response = await this.service.update(id, req.body);

    return res.status(response.statusCode).send(response);
  }

  async delete(req: express.Request, res: express.Response) {
    const { user } = req.params;

    let response = await this.service.delete(user);

    return res.status(response.statusCode).send(response);
  }

  async getUser(req: express.Request, res: express.Response) {
    const { param } = req.params;

    const response = await this.service.getUser(param);

    return res.status(response.statusCode).send(response);
  }
}

export default new Controller();
