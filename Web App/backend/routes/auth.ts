const express = require("express")
const router = express.Router()
const argon2 = require("argon2")
const crypto = require("crypto")
const db = require("../database/db")

interface User {
  userId: number
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginParams {
  email: string
  password: string
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body as LoginParams

  db.query(
    `SELECT userId, firstName, lastName, email, password FROM users WHERE email = '${email}'`
  ).then((user: User) => {
    if (user[0].length === 0) {
      res.status(401).send()
    } else {
      argon2.verify(user[0][0].password, password).then(async (match) => {
        if (match) {
          const sessionId = crypto.randomUUID()
          const userId = user[0][0].userId
          db.query(
            `INSERT INTO sessions (sessionId, userId, createdAt, updatedAt) VALUES ('${sessionId}', '${userId}', NOW(), NOW())`
          ).then(() => {
            res
              .status(200)
              .cookie("sessionId", sessionId, {
                secure: true,
                httpOnly: true,
                SameSite: "none", // TODO: Change to "strict" when in production
                maxAge: 1000 * 60 * 60 * 4, //ms*sec*min*hours = 4 hours
                signed: true
              })
              .send()
          });
        } else {
          res.status(401).send()
        }
      })
    }
  })
  .catch(() => {
    res.status(500).send()
  })
})

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if the user already exists
  db.query(
    `SELECT email FROM users WHERE email = '${email}'`,
    async function (error, results) {
      // If there is an issue with the query, output the error
      if (error) {
        console.log(error);
      }
      // If the account exists
      if (!error && results.length > 0) {
        res.send("Account already exists");
      } else {
        // Hash the password
        const hashedPassword = await argon2.hash(password);
        // Insert the user into the database
        db.query(
          `INSERT INTO users (lastName, firstName, email, password, phoneNumber, createdAt, updatedAt) VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '0000000000', NOW(), NOW())`,
          function (error) {
            if (error) {
              console.log(error);
            }
            res.send("Account created successfully");
          }
        );
      }
    }
  );
});


module.exports = router;
