const jwt = require("jsonwebtoken");
const jwtsecret = "chakrinya009";

const fetchuser = (req, res, next) => {
  //sometimes the token is invaild so we use try catch

  try {
    //when sending a header file to this middleware it should be named auth-token
    //from that header we will get token
    const token = req.header("auth-token");
    if (!token) {
      res
        .status(401)
        .json({ error: "Please authenticate using a valid token" });
    }
    const data = jwt.verify(token, jwtsecret);
    req.user = data.user;
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  next();
};

module.exports = fetchuser;
