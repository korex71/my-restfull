import mongoose from "mongoose";
import config from "./database.config";
class Database {
  constructor() {
    mongoose.Promise = Promise;

    mongoose.connection.on("connected", () =>
      console.log("🚀 Database connected.")
    );
    mongoose.connection.on("reconnected", () =>
      console.log("✅ Database connection reestablished.")
    );
    mongoose.connection.on("error", (error) => console.error(error));

    try {
      mongoose.connect(config.connectionUrl, config.connectionOptions);
    } catch (err) {
      if (err) throw err;
    }
  }
}

export default new Database();
