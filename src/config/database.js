import mongoose from "mongoose";
import config from "./configdb";
import server from "./server";

export default {
  auths: mongoose.connection.collection("auths"),
  connectionUrl: config.connectionUrl,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async connect(port) {
    try {
      mongoose.Promise = global.Promise;
      await mongoose.connect(this.connectionUrl, this.connectionOptions);
      console.log("✅ DB Connected");
      server.listen(port, console.log("✨ Server started at:", port));
    } catch (error) {
      console.log(error.message);
      if (error) throw error.message || error;
    }
  },
};
