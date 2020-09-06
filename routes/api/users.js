const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const { User } = require("../../modeles/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route GET api/user
// @desc Test route
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid Email is required").isEmail().not().isEmpty(),
    check("password", "Password is required").isLength(6),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }

      const { name, password, email } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ error: [{ msg: "email already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const SaveUser = await new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      SaveUser.password = await bcrypt.hash(password, salt);

      const result = await SaveUser.save();
      const payload = {
        user: {
          id: result.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecrete"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) return res.status(400).send(err);
          return res.send({ token });
        }
      );
    } catch (error) {
      console.log(err.message);
      return res.status(400).send("server error");
    }
  }
);

module.exports = router;
