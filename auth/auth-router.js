const router = require('express').Router();

const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

//api/auth/register OR login

router.post('/register', (req, res) => {
  let credentials = req.body;
  
  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;
  
  Users.add(credentials)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //check the password is valid
        
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log('login error', error)
      res.status(500).json(error);
    });
});

module.exports = router;
