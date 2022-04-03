const User = require('./userSchema');
const bcrypt = require('bcrypt');
const auth = require('../../authentication/auth');

exports.registerUser = (req, res) => {

  User.exists({ email: req.body.email }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
        err
      })
    }


    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'The email address is already registered',
      })
    }


    const salt = bcrypt.genSaltSync(10);

    bcrypt.hash(req.body.password, salt, (err, hash) => {

      if(err) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Encrypting the password failed',
          err
        })
      }


      User.create({
        firstName:      req.body.firstName,
        lastName:       req.body.lastName,
        email:          req.body.email,
        passwordHash:   hash
      })
      .then(user => {
        res.status(201).json({
          statusCode: 201,
          status: true,
          message: 'User successfully created!',
          token: auth.generateToken(user)
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to create user',
          err
        })
      })
    })
  })

}




exports.loginUserWithEmailAndPassword = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You probably made a bad request.',
        err
      })
    }

    if(!user) {
      return res.status(401).json({
        statusCode: 401,
        status: false,
        message: 'Incorrect email and/or password',
      })
    }

    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {

      if(err) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Decrypting the password failed',
        })
      }

      if(!result) {
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'Incorrect email and/or password',
        })
      }


      res.status(200).json({
        statusCode: 200,
        status: true,
        message: 'Authentication was successful!',
        token: auth.generateToken(user)
      })

    })
  })
}