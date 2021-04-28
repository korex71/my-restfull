import "dotenv/config.js";

const env = process.env.NODE_ENV || "development";

console.log(`🚀 ${env.charAt(0).toUpperCase() + env.slice(1)}`);
// Ignora isso por favor

export default {
  production: {
    connectionUrl: process.env.MONGODB_URI,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
  development: {
    connectionUrl: process.env.DEV_DB,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
}[env];
