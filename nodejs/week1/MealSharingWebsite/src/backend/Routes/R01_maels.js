//Route /meals:	Respond with the json for all the meals. For each meal, if there are reviews matching it's meal ID,
// add these reviews to each meal in the form of an array. For meals that do not have any reviews, the "reviews" 
//property will be an empty array. (watch the GIF below to understand how it should be structured)

var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {
  var meals = await knex.select('*').from('meal');
  var mealsWithReviews = await Promise.all(meals.map(async meal => {
    meal.reviews = await knex.select('*').from('review').where('meal_id', meal.id);
    return meal;
  }))
  console.log('R01_meals.js is called');
  res.send(JSON.stringify(mealsWithReviews))
});

module.exports = router;
