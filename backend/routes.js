const express = require('express');
const router = express.Router();
const Thread = require('../models/models').Thread;
const User = require('../models/models').User;
const Comment = require('../models/models').Comment;

// YOUR API ROUTES HERE
router.get('/', (req, res) => {
    User.findOne({ attributes: { exclude: ['password'] }, include: {model: Thread, Comment}, where: {id: req.user.id} })
      .then((result) => {
          if (result === null) {
              res.json({success: false});
          } else {
              res.json({success: true, userInfo: result});
              // result will contain everything related to the user which includes all their comments and threads
          }
      })
      .catch((err) => {
          console.log('Finding user route error', err);
      });
});

router.get('/:username', (req, res) => {
    User.findOne({ where: {username: req.params.username} })
      .then((result) => {
          if (result === null) {
              res.json({success: false});
          } else {
              const user = {
                  userId: result.id,
                  username: result.username,
                  commentKarma: result.commentKarma,
                  postKarma: result.postKarma
              };
              res.json({success: true, user: user});
          }
      })
      .catch((err) => {
          console.log('Get user', err);
      });
});

router.post('/post/new', (req, res) => {
    Thread.create({content: req.body.content})
      .then((result) => {
          res.json({success: true, newPost: result});
      })
      .catch((err) => {
          console.log('New post error in backend', err);
      });
});

router.get('/post/all', (req, res) => {
    Thread.findAll({ include: {model: User}, order: [['createdAt', 'DESC']] })
      .then((result) => {
          if (result.length > 0) {
              res.json({success: true, posts: result});
          } else {
              res.json({success: false});
          }
      })
      .catch((err) => {
          console.log('Post all error', err);
          res.json({success: false, error: err});
      });
});

// SAMPLE ROUTE
router.use('/users', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
