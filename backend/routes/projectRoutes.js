const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { Project } = require('../models/projectModel.js');
const { isAdmin, isAuth } = require('../utils.js');

const projectRouter = express.Router();

projectRouter.get('/', async (req, res) => {
  const project = await Project.find();
  res.send(project);
});

projectRouter.get('/home', async (req, res) => {
  const project = await Project.find().limit(3);
  res.send(project);
});

projectRouter.post(
  '/new',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProject = new Project({
      name: 'sample project' + Date.now(),
      technology: '/images/react.png.webp',
      link: 'sample link',
      image: '/images/babyfie.png.webp',
      description: 'sample description',
      imgStart: true,
    });
    const project = await newProject.save();
    res.send({ message: 'Project Created', project });
  })
);

projectRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (project) {
      project.name = req.body.name;
      project.technology = req.body.technology;
      project.image = req.body.image;
      project.link = req.body.link;
      project.imgStart = req.body.imgStart;
      project.description = req.body.description;
      await project.save();
      res.send({ message: 'Project Updated' });
    } else {
      res.status(404).send({ message: 'Project Not Found' });
    }
  })
);

projectRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.remove();
      res.send({ message: 'Project Deleted' });
    } else {
      res.status(404).send({ message: 'Project Not Found' });
    }
  })
);

const PAGE_SIZE = 6;

projectRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const projects = await Project.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProjects = await Project.countDocuments();

    res.send({
      projects,
      countProjects,
      page,
      pages: Math.ceil(countProjects / pageSize),
    });
  })
);

projectRouter.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.send(project);
  } else {
    res.status(404).send({ message: 'Project not found' });
  }
});

module.exports = { projectRouter };
