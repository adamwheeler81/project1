# Gluten Tootin
#### Making gluten free choices easy!

(https://img.shields.io/github/issues/adamwheeler81/project1)  https://img.shields.io/github/forks/adamwheeler81/project1
## Concept
This is an app for searching for gluten-free recipes and restaurants.

We developed this app for users to search for gluten-free recipes, and also provide a list of restaurants with similar gluten-free options.

As a person with certain dieting restrictions, I want to be able to search for food that fits into my diet plan, so that I won’t eat food that is potentially harmful.


## Tech Utilized
#### Languages: 
* HTML
* CSS
* Javascript & jQuery

#### APIs used:
* [Spoonacular](https://spoonacular.com/food-api)
* [Zomato](https://developers.zomato.com/api/v2.1/)

#### CSS Framework used:
* [Foundation](https://foundation.zurb.com/)


## Collaborators
#### Lead developer: 
Dan Dismuke 
* GitHub: [GuyFromHere](https://github.com/GuyFromHere)

#### Lead Designer: 
Adam Wheeler
* GitHub: [adamwheeler81](https://github.com/adamwheeler81)

#### Lead Administrator: 
Laurie Schroeder
* GitHub: [clauries](https://github.com/clauries)


## How to Use
<img src="assets/images/capture-landing-page-start.png" alt="Landing Page" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-landing-page-search-recipe.png" alt="Landing Page: search for recipes by ingredients" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-recipes-results.png" alt="Recipe Results Page" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-recipes-card.png" alt="Recipe Card" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-landing-page-search-restaurant.png" alt="Landing Page: search for restaurants near you" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-restaurants-give-location.png" alt="Give permission to use location" style="float: left; margin-right: 10px;" width="200"/><img src="assets/images/capture-restaurants-results.png" alt="Restaurant Results Page" style="float: left; margin-right: 10px;" width="200"/>

* Go to https://adamwheeler81.github.io/project1/ to use page.

* You'll be greeted by our landing page. This offers you two options:
..* Add ingredients and then search for a recipe that is gluten free.
..* Search for a nearby restaurant that has gluten free options.

* When you get the recipe results, all options presented will be gluten free. Try searching for "wheat" - you'll get no results. Each result populates with the length of cooking time and number of servings. When you click on a card, you'll be presented with the ingredients used in that recipe and the option to save (it does not work; please see Directions for Future Development) and an option to go to recipe. This button will take you to the recipe's original site. 

* When you attempt to get the restaurant results, you will be prompted to provide geolocation. If you click "allow," nearby restaurants will populate. Information for the restaurant's type of cuisine, user rating, and address will be provided. 


## Challenges
* **Finding Our Roles**: This was the first time any of us had worked together. We are all very curteous, kind people who do not want to step on anyone else's toes. It took some time to settle into our specific roles.

* **GitHub**: We had a steep learning curve with GitHub projects, issues, branching, and merging. None of us had used these aspects of GitHub before. Between the learning curve and Thanksgiving break in between learning the features and actually using them, we wasted a lot of time messing with GitHub. 

* **Working with Other People's Code**: We were learning when we needed to merge branches so no one was using wrong code. We were learning how each other's code looked and how we labled things. We were figuring out each other's logic and learning how to leave detailed notes so others could follow our paths. It was difficult to explain our code to the others enough.

* **Working with Foundations**: The CSS framework we chose was not as helpful as it sold itself to be. It was a bit unruly to work with - particularly the grid system. Regular CSS grid formatting would have been easier to implement. 


## Successes
* **Minimal HTML**: Dan figured out how to create templates using JS. This meant we did not have to load much code when the page opens. Instead we dynamically write the code as needed. 

* **Cohesive Look**: Adam created a logo and styled the website. No matter the section you are in, you feel the cohesiveness of the product. Additionally, the style is on trend with a modern and clean look.

* **Consistent Coding**: Although three people collaborated on the code, we worked hard to keep our coding similar by using similar naming practices, developing templates, and learning how others were coding similar pieces of code.

* **Conquering Foundation's Grid**: Adam & Dan worked hard to get the recipes to form a grid rather than a list.


## Directions for Future Development
* **Profile to Save Favorites**: Currently the save function does not work. We would love to develop a system that creates a user profile. This profile will have a place where favorite recipes & restaurants can be saved. 

* **Email Recipes**: Provide users the opportunity to e-mail a recipe to self in case they want to use the recipe outside the app. 

* **More Search Options**: Develop more ways to search for recipes & restaurants. There are various ways to search through the APIs. For this project, we chose to stick to simpler options. It would be great to provide users with multiple routes to get a recipe or list of restaurants.

* **Search for Stores**: Expand app to search for stores that sell gluten-free items. This will probably require an additional API.

* **Add Rating System**: Develop a rating system for restaurants & stores to help other users know how gluten-free-friendly a location actually is. For example: are there only a couple options on the menu and there could be cross-contamination? Or is the entire establishment gluten-free?

## License
Copyright [2019] [Adam Wheeler, Dan Dismuke, Laurie Schroeder]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.