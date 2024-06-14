const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = verifyToken;
