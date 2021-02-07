const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.MONGOURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection is sucessfull");
  })
  .catch((e) => {
    console.log("no connection",e);
  });

module.exports = connection;
