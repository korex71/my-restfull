import utils from '../helpers/Users'
class Controller {

  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async getAll(req, res) {
    return res.status(200).send(await this.service.getAll());
  }

  async insert(req, res) {

    const {email, user, password} = req.body;

    const {ascii, base64} = await utils.getSecretAndBase64(user)

    const response = await this.service.insert({email, user, password, twoFactors: ascii});

    if (response.error) return res.status(response.statusCode).send(response);
    
    await this.service.sendMail({email, user, base64})
    
    delete response.user.password;

    return res.status(201).send(response);

  }

  async update(req, res) {
    const { id } = req.params;

    let response = await this.service.update(id, req.body);

    return res.status(response.statusCode).send(response);
  }

  async delete(req, res) {
    const { user } = req.params;

    let response = await this.service.delete(user);

    return res.status(response.statusCode).send(response);
  }

  async getUser(req, res){
    const { param } = req.params;

    const response = await this.service.getUser(param);

    return res.status(response.statusCode).send(response);
    
  }

}

export default Controller;