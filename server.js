import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";





mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

import express from 'express';

//Test commit

//import userRoutes from '../MyPortfolio/server/routes/user.routes.js';
import contactsRoutes from '../MyPortfolio/server/routes/contact.routes.js';
import qualificationsRoutes from '../MyPortfolio/server/routes/education.routes.js';
import projectsRoutes from '../MyPortfolio/server/routes/project.routes.js';

app.use(express.json());
//app.use('/api/users', userRoutes);
app.use('/', contactsRoutes);
app.use('/', qualificationsRoutes);
app.use('/', projectsRoutes);







