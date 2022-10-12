const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const { uploadRouter } = require('./routes/uploadRoutes.js');
const { projectRouter } = require('./routes/projectRoutes.js');
const { userRouter } = require('./routes/userRoutes.js');
const { techRouter } = require('./routes/techRoutes.js');
const { mailRouter } = require('./routes/mailRoutes.js');
// const { seedRouter } = require('./routes/seedRouter.js');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api/mail', mailRouter);
app.use('/api/techs', techRouter);
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/upload', uploadRouter);

// error handler middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});
