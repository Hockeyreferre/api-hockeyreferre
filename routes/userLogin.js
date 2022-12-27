const express = require('express');
const User = require('../models/user');
const router = express.Router();
var async = require('async');


router.get('', async (req, res) => {
    res.render('login', {});
})

router.post('/login', async (req, res) => {
    async.waterfall([
        function (callback) {
          User.findOne({
            "email_address": req.body.email
          }, function (err, result) {
            if (err) {
              console.log(err);
              res.send({error: "An error has occurred"});
            } else {
              if (result == null) {
                res.send({"error": "This email address is not recognised, please check you have entered your email correctly"});
              } else {
                console.log("Email recognised");
                callback(null, result);
              }
            }
          });
        },
        function (result, callback){
          var password = result.password;
          if (req.body.password !== password){
            res.send({"error":"Sorry your password is incorrect"});
          } else {
            res.redirect('/api')
            login = true;
          }
        }
      ])
})

module.exports = router;
