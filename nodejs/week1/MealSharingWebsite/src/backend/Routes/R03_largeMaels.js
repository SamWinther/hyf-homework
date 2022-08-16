//Route /large-meals : Respond with the json for all the meals (including it's reviews) that can fit lots of people
var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {
  var meals = await knex.select('*').from('meal').where('max_reservation', '>', '10');
  var mealsWithReviews = await Promise.all(meals.map(async meal => {
    meal.reviews = await knex.select('*').from('review').where('meal_id', meal.id);
    return meal;
  }))
  console.log('R03_largeMeals.js is called');
  res.send(JSON.stringify(mealsWithReviews))
});

module.exports = router;
