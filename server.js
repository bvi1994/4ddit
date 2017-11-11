const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');
const bodyParser = require('body-parser');
const models = require('./models/models');
const auth = require('./backend/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = models.User;
const Thread = models.Thread;
const Comment = models.Comment;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  // YOUR CODE HERE
    User.findById(id)
      .then(result => {
          done(null, result);
      })
      .catch(err => {
          console.log(err);
      });
});


passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
    User.findOne({where: { username: username, password: password }}, function(err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
        if (err) {
            console.error('Error fetching user in LocalStrategy', err);
            return done(err);
        }
      // if no user present, auth failed
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
      // if passwords do not match, auth failed
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
      // auth has has succeeded
        return done(null, user);
    });
}
));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use('/api', auth(passport));
app.use('/api', api);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
