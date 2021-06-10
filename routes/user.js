const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const BlogPost = require('../model/BlogPost');
const User = require("../model/User");

function isValidUser(uType) {
  if(uType == "educator" || uType == "guardian") {
    return true;
  }
  return false;
}


router.get('/login',async function(req,res){
  //console.log("User id: " + req.userId);
  res.render('login',{title: 'login', logErrors: undefined});
});

router.get('/register',async function(req,res){
  //console.log("User id: " + req.userId);
  res.render('register',{title: 'register'});
});


router.get("/information", async function(req,res){
    var account = 
    console.log(account);
    res.render('userInfo',{title: 'Account Information'});
});

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password,
            uType
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            else if(!isValidUser(uType)) {
              return res.status(400).json({
                msg: "Invalid User Type"
              });
            }

            user = new User({
                username,
                email,
                password,
                uType
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        message: {}
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


router.post(
    "/signin",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        var logErrors=  "User Not Exist"
        return res.render('login',{title: 'login', errors})
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user) {
          var logErrors=  "User Not Exist"
          return res.render('login',{title: 'login',logErrors})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          var logErrors=  "Incorrect Password !"
          return res.render('login',{title: 'login',logErrors})
        }
  
        const payload = {
          user: {
            id: user.id,
            uType: user.uType
          }
        };
        
        // const hId = user.id

        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.redirect('/all-posts')
            // res.status(200).json({
              //   token,
              //   message: "login successful"
              // });
            }
          );

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );
  

module.exports = router;