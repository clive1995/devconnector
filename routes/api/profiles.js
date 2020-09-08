const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../modeles/Profile");
const { User } = require("../../modeles/user");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

// @route GET api/profiles
// @desc Get Current User Profile
//@access Public
router.get("/me", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profiles) return res.status(400).send({ msg: "user not found" });
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.status(400).send("server error");
  }
});

// @route POST api/profile
// @desc create or update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skills) => skills.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        console.log("i is here");
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: profileFields,
          },
          { new: true }
        );
        return res.send({ profile });
      } else {
        console.log("i is not here");
        profile = new Profile(profileFields);
        await profile.save();
        return res.send({ profile });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.status(400).send("server error");
  }
});

router.get("/user/:userId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).send({ msg: "user not found" });
    res.send(profile);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId")
      return res.status(400).send({ msg: "user not found" });
    res.status(400).send("server error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await user.findOneAndRemove({ _id: req.user.id });
    res.send({ msg: "User deleted." });
  } catch (error) {
    console.log(error);
    res.status(400).send("server error");
  }
});

//@route put/api/profile/experience
//@desc add profile experience
//@access Privete
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check("from", "from date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });
    const {
      title,
      company,
      location,
      description,
      to,
      from,
      current,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).send("user not found");
      profile.experience.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

//@route put/api/profile/experience
//@desc delete profile experience
//@access Privete

router.delete("/experience/:experienceId", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeindex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.experienceId);
    profile.experience.splice(removeindex, 1);
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//@route put/api/profile/education
//@desc add profile education
//@access Privete
router.put(
  "/education",
  [
    auth,
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldofstudy", "field of study is required").not().isEmpty(),
    check("from", "from date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });
    const {
      school,
      degree,
      fieldofstudy,
      description,
      to,
      from,
      current,
    } = req.body;

    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).send("user not found");
      profile.education.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

//@route put/api/profile/education
//@desc delete profile education
//@access Privete

router.delete("/education/:educationId", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeindex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.educationId);
    profile.education.splice(removeindex, 1);
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//@route get/api/profile/github/:username
//@desc get user repos from Giythub
//@access Public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc$client_id=${config.get(
        "githubClientId"
      )}&client_secrete=${config.get("githubSecrete")}`,
      method: "get",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode != 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }
      return res.send(JSON.parse(body));
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
