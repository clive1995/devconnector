const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no token auth denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecrete"));
    //console.log(decoded.user.id);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ msg: "token is not valid" });
  }
};
