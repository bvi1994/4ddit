var express = require('express');
var router = express.Router();
var User = require('../model/models').User;

module.exports = function(passport) {
    router.post('/register', (req, res) => {
        User.findOne({ where: {username: req.body.username} })
          .then((result) => {
              if (result === null) {
                  User.create({username: req.body.username, password: req.body.password})
                    .then(() => {
                        res.json({success: true});
                    });
              } else {
                  res.json({success: false, message: 'User already exists'});
              }
          })
          .catch((err) => {
              console.log('Register backend error', err);
          });
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.json({success: true});
    });

    return router;
};
