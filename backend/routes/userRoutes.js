const bcrypt = require('bcryptjs');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { User } = require('../models/userModel.js');
const { generateToken, isAdmin, isAuth } = require('../utils.js');

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid user or password' });
  })
);

module.exports = { userRouter };
