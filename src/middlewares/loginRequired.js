const jwt = require('jsonwebtoken');

const loginRequired = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).send({ "error": "Login required" });
  const [bearer, token] = authorization.split(' ');
  try {
    const userData = jwt.verify(token, process.env.JWT_KEY);
    req.userId = userData.userId;
    req.userEmail = userData.userEmail;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ "Error": "Invalid access token or it was expired" });
  }
}

module.exports = loginRequired;
