import database from "./config/database"; // Database init
import "dotenv/config.js"; // .env

const port = process.env.PORT || 4444;

database.connect(port);
