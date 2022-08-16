require("dotenv").config();

// create connection
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

// Check that the connection works
knex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
  // userId = 1;
  // knex.select('title','price').from('meal').where('id', userId).then(data => console.log(data));
});

module.exports = knex;
