var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.authCallback = function(req, res) {
  res.redirect('/');
};

exports.signin = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.redirect('/login');
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function(req, res) {
  res.redirect('/');
};

exports.create = function(req, res, next) {  
  User.findOne({email:req.body.email},function(err,userfind){
    if (userfind == null) {
      var user = new User(req.body);
      user.provider = 'local';

      req.assert('email', 'You must enter a valid email.').isEmail();
      req.assert('password', 'Password must be between 8-20 characters long.').len(5,20);
      req.assert('username', 'Username cannot be more than 20 characters.').len(1,20);
      req.assert('confirmPassword', 'Passwords do not match.').equals(req.body.password);

      var errors = req.validationErrors();
      if (errors) {
        return res.status(400).send(errors);
      }

      user.roles = ['authenticated'];
      user.save(function(err){
        if (err) {
          switch(err.code) {
            case 11000:
            case 11001:
            res.status(400).send('Username already taken.');
            break;
            default:
            res.status(400).send('Please fill all the required fields.');
          }
        }
        req.logIn(user, function(err){
          if (err) return next(err);
          return res.redirect('/');
        });
        res.status(200);
      });  
    } else {
      res.status(400).send('This email is already in use.');
    }
  });
};

exports.me = function(req, res) {
  res.jsonp(req.user || null);
};

exports.user = function(req, res, next, id) {
  User.findOne({
    _id: id
  }).exec(function(err,user){
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};