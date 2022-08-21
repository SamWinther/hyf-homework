const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//******************************************* */
//Route /meals
var mealsRoute = require('./Routes/R01_maels');
 app.use('/meals', mealsRoute);
//Route /cheap-meals:	Respond with the json for all the meals (including it's reviews) that are cheap (you define what a cheap meal is)
 var cheapMealsRoute = require('./Routes/R02_cheapMaels');
 app.use('/cheap-meals', cheapMealsRoute);
//Route /large-meals: Respond with the json for all the meals (including it's reviews) that can fit lots of people
 var largeMealsRoute = require('./Routes/R03_largeMaels');
 app.use('/large-meals', largeMealsRoute);
//Route /meal: Respond with the json for a random meal (including it's reviews)
var randomMealRoute = require('./Routes/R04_randomMael');
app.use('/meal', randomMealRoute);
//Route /reservations: Respond with the json for all reservations
var reservationsRoute = require('./Routes/R05_reservations');
app.use('/reservations', reservationsRoute);
//Route /reservation: 	Respond with the json for a random reservation
var randomReservationRoute = require('./Routes/R06_randomReservation');
app.use('/reservation', randomReservationRoute);

app.use(function(req, res) {
  res.send('This is not a valid address. <br> Try one of these route: <br>1. /meals <br>2. /cheap-meals <br>3. /large-meals <br>4. /meal <br>5. /reservations <br>6. /reservation <br>')
});
//******************************************* */

app.use(cors());

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
