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
//fruits
  "Apple",
  "Orange",
  "Banana",
  "Lime",
  "Lemon",
//vegetable
  "Cauliflower",
  "Broccoli",
  "Carrots",
  "Edamame",
  "Asparagus",
//grains, legumes, nuts
  "Black Beans",
  "Garbanzo Beans",
  "Pinto Beans",
  "Oatmeal",
  "Flour",
  "Coconut Flour",
  "Tofu",
//dairy and alternatives
  "Cheddar Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Egg",
  "Milk",
  "Almond Milk",
  "Coconut Milk",
  "Oat Milk",
  "Soy Milk",
//meat
  "Chicken",
  "Beef",
  "Pork",
  "Turkey",
//fish & seafood
  "White-fish",
  "Lobster",
  "Crab",
  "Scallops"

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
