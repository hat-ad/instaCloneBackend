const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("this is signup page");
});

module.exports = router;
