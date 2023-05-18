const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    // check if user has a token
    if (!token) {
      return res.status(404).json({ msg: "user not authorized" });
    }
    //check if token is valid
    // extract the id from the token
    const decodedToken = await jwt.verify(token, process.env.SECRET_PASS);
    const id = decodedToken.userId;
    // find this specific user with this id
    const user = await User.findById(id);
    res.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = isAuth;
