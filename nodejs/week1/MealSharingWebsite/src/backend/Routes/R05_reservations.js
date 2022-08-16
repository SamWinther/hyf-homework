//Route /reservations: Respond with the json for all reservations
var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {
  var reservations = await knex.select('*').from('reservation');
  console.log('R05_reservations.js is called');
  res.send(JSON.stringify(reservations))
});

module.exports = router;
