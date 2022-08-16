//Route /meal: Respond with the json for a random meal (including it's reviews)
var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {

  var randomMeal = await knex.select('*').from('meal').orderByRaw('RAND()').limit(1);
  var randomMealsWithReviews = await Promise.all(randomMeal.map(async meal => {
    meal.reviews = await knex.select('*').from('review').where('meal_id', meal.id);
    return meal;
  }))
  console.log('R04_randomMael.js is called');
  res.send(JSON.stringify(randomMealsWithReviews))
});

module.exports = router;
