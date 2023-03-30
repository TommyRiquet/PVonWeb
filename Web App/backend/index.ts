const cors = require('cors')
const bodyParser = require('body-parser')
const express = require("express")
const path = require("path")
const { AppDataSource } = require("./config/database")

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


app.use(express.static(__dirname + "/build"));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}.`);
        });
    })
    .catch((error) => console.log(error))

module.exports = app
