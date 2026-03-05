import dotenv = require('dotenv');
dotenv.config()

const ENV = {
  PORT: process.env.PORT,
  RICK_API_URL: process.env.RICK_API_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
}

export = { ENV };
