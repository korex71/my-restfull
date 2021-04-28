import mongoose from "mongoose";
import config from "./database.config";
import server from "./server";

const port = process.env.PORT || 4444;
class Database {
  constructor() {
    mongoose.Promise = Promise;

    mongoose.connection.on(
      "connected",
      () => {
        console.log("🚀 Database connected.");
      },
      "reconnected",
      () => {
        console.log("✅ Database connection reestablished.");
      },
      "error",
      (error) => {
        console.error(error);
      }
    );

    try {
      mongoose.connect(config.connectionUrl, config.connectionOptions);
      server.listen(port, console.log("🔥 Server started at:", port));
    } catch (err) {
      if (err) throw err;
    }
  }
}

export default new Database();
