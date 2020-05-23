const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')




const User = require('../../models/User');

//Routes

//Get all times
router.post('/', (req, res) => {
  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({msg: "Please enter in all fields"})
  }
  User.findOne({email: email })
    .then(user => {
      if(!user) return res.status(400).json({msg: "User does not exist"})

      //Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: "Invalid login"});

          jwt.sign(
            {id: user.id},
            "secretKey",
            {expiresIn:7200},
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })


    })
});


//Get user data which is private
router.get("/user", auth, (req, res) =>{
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      res.json(user)
    });
} )

module.exports = router;
