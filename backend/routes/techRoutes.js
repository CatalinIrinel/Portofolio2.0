const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { Technology } = require('../models/techsModel.js');
const { isAdmin, isAuth } = require('../utils.js');

const techRouter = express.Router();

techRouter.get('/', async (req, res) => {
  const tech = await Technology.find();
  res.send(tech);
});

techRouter.get('/home', async (req, res) => {
  const tech = await Technology.find().limit(6);
  res.send(tech);
});

techRouter.post(
  '/new',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newTech = new Technology({
      tech: 'sample tech' + Date.now(),
      image: '/images/react.png.webp',
      description: 'sample description',
    });
    const tech = await newTech.save();
    res.send({ message: 'Tech Created', tech });
  })
);

techRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const techId = req.params.id;
    const tech = await Technology.findById(techId);
    if (tech) {
      tech.tech = req.body.tech;
      tech.image = req.body.image;
      tech.description = req.body.description;
      await tech.save();
      res.send({ message: 'Tech Updated' });
    } else {
      res.status(404).send({ message: 'Tech Not Found' });
    }
  })
);

techRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const tech = await Technology.findById(req.params.id);
    if (tech) {
      await tech.remove();
      res.send({ message: 'Tech Deleted' });
    } else {
      res.status(404).send({ message: 'Tech Not Found' });
    }
  })
);

const PAGE_SIZE = 6;

techRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const techs = await Technology.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countTechs = await Technology.countDocuments();

    res.send({
      techs,
      countTechs,
      page,
      pages: Math.ceil(countTechs / pageSize),
    });
  })
);

techRouter.get('/:id', async (req, res) => {
  const tech = await Technology.findById(req.params.id);
  if (tech) {
    res.send(tech);
  } else {
    res.status(404).send({ message: 'Tech not found' });
  }
});

module.exports = { techRouter };
