const express = require('express');
const { data } = require('../data');
const { Project } = require('../models/projectModel');
const { Technology } = require('../models/techsModel');
const { User } = require('../models/userModel');

const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  await Project.deleteMany({});
  const projects = await Project.insertMany(data.projects);

  // await User.deleteMany({});
  // const user = await User.insertMany(data.user);

  await Technology.deleteMany({});
  const tech = await Technology.insertMany(data.techs);

  res.send({ projects, tech });
});

module.exports = { seedRouter };
