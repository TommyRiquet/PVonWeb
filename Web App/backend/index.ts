const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");
const Sequelize = require('sequelize');
import config from "./config/config";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect as any,
    logging: config.development.logging
  }
);

const app = express();

// Middleware
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start server
const PORT = process.env.PORT || 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}.`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });