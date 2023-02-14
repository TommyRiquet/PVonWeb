const mysql = require('mysql2')

const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'pvonweb',
    user : process.env.DB_USER
})

connexion.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = connexion.promise();
