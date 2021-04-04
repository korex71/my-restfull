import mongoose from "mongoose";
import config from "./configdb";

class Connection {

  auths = mongoose.connection.collection("auths")

  #connectionUrl = config.connectionUrl
  #connectOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  constructor() {
    this.#connect()
  }

  #connect(){
    try {
      mongoose.Promise = global.Promise;
      mongoose
      .connect(this.#connectionUrl, this.#connectOptions)
      .then(console.log("DB Connected"))
    } catch (error) {
      console.error(error)
    }
  }

}

export default new Connection();