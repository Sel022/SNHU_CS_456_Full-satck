var fs = require('fs');
var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

const meals = (req, res) => {
    res.render('meals',{title: 'Travlr Getaways - Meals', mealsData});
};

module.exports = {
    meals
};