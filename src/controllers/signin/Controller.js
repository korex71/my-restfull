class Controller {

  constructor(service) {
    this.service = service;
    this.authenticate = this.authenticate.bind(this)
  }

  async authenticate(req, res){
    const response = await this.service.authenticate(req.body)

    const {message, data, error, statusCode} = response;
  
    if(error)
      res.status(statusCode).send({error: message})
    
    res.status(statusCode).send({message, data});
  }

}

export default Controller;