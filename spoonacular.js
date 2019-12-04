// spoonacular API variables
var API_KEY = "8bbe4883ffmsha9564d872aea43bp1b06fcjsn70a0aec9d586";

var sQueryStr =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";

var sQueryObject = {
  queryIngredients: [],
  queryCourse: "",
  queryCuisine: ""
};

// Default settings object with empty queryStr
var sSettings = {
  async: true,
  crossDomain: true,
  url: sQueryStr,
  method: "GET",
  headers: {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY
  }
};

var returns = [10, 25, 50, 100];

var courses = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "drink"
];

var ingredientsList = [
  "apple",
  "orange",
  "cauliflower",
  "beans",
  "cheddar",
  "swiss",
  "chicken",
  "beef",
  "pork"
];

var cuisine = [
  "african",
  "chinese",
  "japanese",
  "korean",
  "vietnamese",
  "thai",
  "indian",
  "british",
  "irish",
  "french",
  "italian",
  "mexican",
  "spanish",
  "middle eastern",
  "jewish",
  "american",
  "cajun",
  "southern",
  "greek",
  "german",
  "nordic",
  "eastern european",
  "caribbean",
  "latin american"
];
