const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { User } = require("../../modeles/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
// @route GET api/auth
// @desc Test route
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("internel server seeor");
  }
});

router.post(
  "/",
  [
    check("email", "email is required").not().isEmpty(),
    check("password", "please enter password").not().isEmpty(),
  ],
  async (req, res) => {
    const validationerrors = validationResult(req);
    if (!validationerrors.isEmpty()) {
      return res.status(400).send(errors);
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .send({ error: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ error: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecrete"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("server error");
    }
  }
);

module.exports = router;
