const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "user not logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "user not logged in" });
    }
    const { _id } = payload;
    req.user = await User.findById(_id);
    next();
  });
};

module.exports = authToken;
