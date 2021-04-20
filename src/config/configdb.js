import "dotenv/config.js";

const env = process.env.NODE_ENV || "development";

console.log(`🚀 ${env.charAt(0).toUpperCase() + env.slice(1)}`);

export default {
  production: {
    connectionUrl: process.env.MONGODB_URI,
  },
  development: {
    connectionUrl: process.env.DEV_DB,
  },
}[env];
