//Route /reservation: 	Respond with the json for a random reservation
var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {
  var RandomReservations = await knex.select('*').from('reservation').orderByRaw('RAND()').limit(1);
  console.log('R06_randomReservation.js is called');
  res.send(JSON.stringify(RandomReservations))
});

module.exports = router;
