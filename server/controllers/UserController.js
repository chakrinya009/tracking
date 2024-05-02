

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//secret to sign the jwtsignature
const jwtsecret = "chakrinya009"; //this should be stored in .env.local

//Create a user using POST :/api/auth/createuser. Doesn't require login (new user)

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This user already exist" });
      }

      //creating a passwordhash
      let salt = bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        date: req.body.date,
      });

      let data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, jwtsecret); //data need to be object, secrect should be string
      success = true;
      res.json({ success, auth_token: token }); //sending jws token to user

      // res.json(user);
      //on await promise will be returned to user
    } catch (err) {
      console.log({ error: err.message });
      return res.status(500).send("Some error occur");
    }
  }
);

//creating a endpoint for login:old user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(), //if it is present or not
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //still this if any invalid input we can detect it here without going to database
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter the correct username" });
      }
      let passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter the correct password" });
      }
      let data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      var token = jwt.sign(data, jwtsecret); //data need to be object, secrect should be string
      res.json({ success, auth_token: token }); //sending jws token to user
    } catch (err) {
      console.log({ error: err.message });
      return res.status(500).send("Internal error occur");
    }
  }
);

//creating a endpoint for getting logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //once we get the user from the id then we will select his info except passord.
    res.send(user);
  } catch (err) {
    console.log({ error: err.message });
    return res.status(500).send("Internal error occur");
  }
});

module.exports = router;