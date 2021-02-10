require("dotenv").config();
const express = require("express");
require("./DB/connection");

const server = express();

//middlewares
server.use(express.json());
server.use(require("./router/auth"));

server.listen(process.env.PORT || "8000", () => {
  console.log("listening on port 8000");
});
