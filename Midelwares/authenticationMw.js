const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decoded_token = jwt.verify(token, "secretkey");
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "not Authenticated";
    next(error);
  }
};
module.exports.isAdmin = (req, res, next) => {
  const { role } = req.token;
  if ( role === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Access denied. Only admin are allowed." });
  }
};
module.exports.isteacher = (req, res, next) => {
  const { role } = req.token;
  if ( role === "teacher") {
    next();
  } else {
    res.status(403).send({ message: "Access denied. Only teachers are allowed." });
  }
};
module.exports.ischild= (req, res, next) => {
  const { role } = req.token;
  if ( role === "child") {
    next();
  } else {
    res.status(403).send({ message: "Access denied. Only child are allowed." });
  }
};