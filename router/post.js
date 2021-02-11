const express = require("express");
const mongoose = require("mongoose");
const { Post } = require("../models/index");
const router = express.Router();

//middleware
const authToken = require("../middleware/authToken");

router.get("/post", authToken, async (req, res) => {
  let response = [];
  if (req.query.user === "true") {
    response = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
  } else {
    response = await Post.find({}).populate("postedBy", "_id name");
  }
  res.json({
    posts: response,
  });
});

router.post("/post", authToken, async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(422).json({ err: "please add all the fields" });
    }
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      postedBy: req.user,
    });
    console.error(req.user);
    const response = await post.save();
    res.status(201).json({
      status: "Post Created",
      response,
    });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

module.exports = router;
