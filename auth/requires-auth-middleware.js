// const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model');

module.exports = (req, res, next) => {

  if(req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ you: "CANNOT PASS!" })
  }



    // let { username, password } = req.body;

    // if(username && password) {
    //     Users.findBy({ username })
    //     .first()
    //     .then(user => {
    //       if (user && bcrypt.compareSync(password, user.password)) {
    //        next();
    //       } else {
    //         res.status(401).json({ message: 'Invalid Credentials' });
    //       }
    //     })

    
    //   .catch(error => {
    //     console.log('login error', error)
    //     res.status(500).json(error);
    //   });
    // } else {
    //     res.status(400).json({message: "PROVIDE CREDENTIALS"})
    // }
};