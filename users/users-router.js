const router = require('express').Router();

const Users = require('./users-model.js');
const requiresAuth = require('../auth/requires-auth-middleware')

//api/users
router.get('/', requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;