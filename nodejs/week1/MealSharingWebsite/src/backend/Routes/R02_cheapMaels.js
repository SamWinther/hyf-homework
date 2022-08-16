//Route /cheap-meals:	Respond with the json for all the meals (including it's reviews) that are cheap (you define what a cheap meal is)
var express = require('express');
var router = express.Router();

var knex = require('../database')

router.get('/', async function(req, res, next) {
  var meals = await knex.select('*').from('meal').where('price', '<', '5');
  var mealsWithReviews = await Promise.all(meals.map(async meal => {
    meal.reviews = await knex.select('*').from('review').where('meal_id', meal.id);
    return meal;
  }))
  console.log('R02_cheapMeals.js is called');
  res.send(JSON.stringify(mealsWithReviews))
});

module.exports = router;
