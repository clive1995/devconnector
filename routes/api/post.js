const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const { User } = require("../../modeles/user");
const Post = require("../../modeles/Post");
const Profile = require("../../modeles/Profile");

// @route GET api/post
// @desc create a post
//@access Public
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    try {
      let user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      return res.send(post);
    } catch (error) {
      return res.status(400).send("Server Error");
    }
  }
);

// @route GET api/post
// @desc get all post
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    return res.send(post);
  } catch (error) {
    return res.status(400).send("Server Error");
  }
});
// @route GET api/post
// @desc get all post by userID
//@access private
router.get("/:userId", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ user: req.user.id });
    if (!post) return res.status(400).send({ msg: "no post found" });
    return res.send(post);
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.send({ msg: "no post found" });
    }
    return res.status(400).send("Server Error");
  }
});

// @route Delete api/post
// @desc delete a post
//@access private
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.send({ msg: "no post found" });
    //check on the user
    if (post.user.toString() !== req.user.id)
      return res.status(400).send({ msg: "User not authorize" });

    await post.remove();

    if (!post) return res.status(400).send({ msg: "no post found" });

    return res.send(post);
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.send({ msg: "no post found" });
    }
    return res.status(400).send("Server Error");
  }
});

// @route put api/post
// @desc Like a post
//@access private
router.put("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return req.status(400).send({ msg: "Post not Found" });

    if (post.user.toString() === req.user.id)
      return res.status(400).send({ msg: "you cannot like your own post" });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send("Post already liked");
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.send(post.likes);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    return res.status(400).send("Server Error");
  }
});

// @route put api/post
// @desc Like a post
//@access private
router.put("/unlike/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return req.status(400).send({ msg: "Post not Found" });

    if (post.user.toString() === req.user.id)
      return res.status(400).send({ msg: "you cannot unlike your own post" });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send("Post has not been liked");
    }
    const findIndex = post.likes.indexOf({ user: req.user.id });
    post.likes.splice(findIndex, 1);
    await post.save();
    return res.send(post.likes);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    return res.status(400).send("Server Error");
  }
});

// @route Post api/post/comments
// @desc add comments on post
//@access Public
router.put(
  "/comments/:postId",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    console.log(req.text);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    try {
      let user = await User.findById(req.user.id).select("-password");
      let post = await Post.findById(req.params.postId);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.send(post.comments);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).send("Post not found");
      }
      return res.status(400).send("Server Error");
    }
  }
);

// @route delete api/post/comments
// @desc delete comments
//@access Public
router.delete("/comments/:postId/:commentId", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).send({ errors: errors.array() });

  try {
    let post = await Post.findById(req.params.postId);

    let comment = post.comments.find(
      (e) => e.id.toString() === req.params.commentId
    );
    if (!comment) {
      return res.status(400).send({ msg: "comment does not exists" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).send({ msg: "User not authorized" });
    }
    let indexval = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.commentId);
    post.comments.splice(indexval, 1);
    await post.save();
    return res.send(post.comments);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    return res.status(400).send("Server Error");
  }
});
module.exports = router;
