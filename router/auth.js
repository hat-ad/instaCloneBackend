const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authToken = require("../middleware/authToken");

const router = express.Router();

//models
const { User } = require("../models/index");

//register the user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).send("please enter all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      let hashedPassword = await bcrypt.hash(password, 12);
      const userObj = new User({
        name,
        email,
        password: hashedPassword,
      });
      const response = await userObj.save();
      res.json({
        status: 201,
        body: response,
      });
    } else {
      res.status(422).send("user present");
    }
  } catch (error) {
    res.send(error);
  }
});

//login the user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send("please enter all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send("user not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("incorrect username or password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    return res.json({ token: token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", authToken, (req, res) => {
  res.send(req.user);
});
module.exports = router;
