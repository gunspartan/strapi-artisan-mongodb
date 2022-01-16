const dotenv = require("dotenv");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 8080),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", process.env.ADMIN_JWT_SECRET),
    },
  },
});
