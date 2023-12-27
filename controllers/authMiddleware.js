const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "aryanCode", (err, decodedToken) => {
      if (err) {
        res.redirect("/auth/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "aryanCode", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { requireAuth,checkUser};
