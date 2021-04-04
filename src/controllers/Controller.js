class Controller {

  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    return res.status(200).send(await this.service.getAll());
  }

  async insert(req, res) {

    const {email, user, password} = req.body;

    if(!email, !user, !password) res.status(400).send({error: 'Invalid format'})
    
    const response = await this.service.insert({email, user, password});

    if (response.error) return res.status(response.statusCode).send(response);
    
    await this.service.sendMail({ email, user, base64: response.base64})
    
    delete response.base64

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

}

export default Controller;