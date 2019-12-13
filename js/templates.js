//Build landingPage static html
function landingPage() {
  $("#root").empty();
  $("#root").html(`
<div class="landing-page-container">
  <div class="input-wrapper">
    <img class="logo" src="assets/images/Gluten Tootin Logo_Fotor.png" />

    <div class="input-content">
      <h1>What ingredients do you want to use?</h1>
      <p>INGREDIENTS</p>
      <input type="text" id="mainInput" autocapitalize="none" value="" />

      <div class="ingredient-autocomplete-container"></div>

      <div id="ingredient-pill-box"></div>
      <div class="action-container">
        <button type="button" id="recipeFind" class="search-cta btn btn-secondary">
          Find a recipe
        </button>

        <button type="button" id="restaurantFind" class="search-cta btn btn-secondary">
          Find a restaurant
        </button>
      </div>
    </div>
  </div>
</div>
`);
}

//Build sidebar for recipes
function getIngredientsSidebar(ingredients) {
  return `
    <h3>Search Ingredients:</h3>
    <input type="text" id="mainInput"></input>
    <div id="ingredient-pill-box">
        ${ingredients
          .map(
            (ingredient, index) =>
              `<div class="ingredient-pill">${ingredient}&nbsp;&nbsp;<span id=${index} class="ingRemove">x</span></div>`
          )
          .join("")}
    </div>
    <button type="button" id="recipeFind" class="search-cta btn btn-secondary">Submit</button>`;
}

function getRecipeCard(recipe) {
  return `
        <div id="${recipe.id}" class="recipeCard cell medium-3">
            <h5>${recipe.title}</h5>
            <ul>
                <li><i>Ready in ${recipe.readyInMinutes} minutes</i></li>
                <li><i>Serves: ${recipe.servings}</i></li>
            </ul>
            <img src="${imageRoot + recipe.image}" 
            alt="${recipe.image}" class="recipeCardImg">
        </div>
    `;
}

function getRecipeModal() {
  return `
        <dialog id="recipeModal">
            <div class="grid-x grid-margin-x">
                <div class="cell column medium-6">
                    <img id="recipeModalImg">    
                </div>
                <div id="recipeModalInfoContainer" class="cell column medium-6">
                    <h3 id="recipeModalTitle"></h3>
                    <span>Ingredients:</span>
                    <div id="recipeModalIngredients">

                    </div>
                    
                </div>
            </div>
            <div id="recipeModalButtonContainer">
                        <button type="button" id="recipeModalSave" class="search-cta">Save</button>
                        <button type="button" id="recipeModalSave" class="search-cta">
                        <a id="recipeModalUrl" target="_blank">View Recipe</a></button>
                    </div>
        </dialog>
    `;
}

function resultsPage(sidebar) {
  $("#root").empty();
  $("#root").html(`
        <div id="resultsContainer" class="cell medium-auto medium-cell-block-container">
            <div id="resultsGrid" class="grid-x grid-padding-x">

                <div id="sidebar" class="cell medium-2 medium-cell-block-y">
                    ${sidebar}
                </div>

                <div id="resultsContainer" class="cell medium-10 medium-cell-block">
                <h3>Search Results:</h3>
                    <div id="results" class="grid-x grid-padding-x"> 

                    </div>
                </div>
            </div>
        </div> 
    `);
}

//Build restaurants sidebar
function getRestaurantsSidebar() {
  console.log("Sidebar Worked");
  return `
    <h3>Search Cuisines:</h3>
    <input type="search" placeholder="Search"></input>
    <input id="sidebarSearch" type="submit" value="Submit"></input>`;
}

//Build Restuarant card with details
function getRestaurantCard(restaurant) {
  return `
        <div id="${restaurant.name}" class="restaurantCard cell medium-3">
            <h5>${restaurant.name}</h5>
            <div>${restaurant.cuisines}</div>
            <div>User Rating: ${restaurant.user_rating.aggregate_rating}/5</div>
            <div>Address: ${restaurant.location.address +
              ", " +
              restaurant.location.city +
              ", " +
              restaurant.location.zipcode}</div>
        </div>
    `;
}

function getRestaurantModal() {
  return `
        <dialog id="restaurant Modal">
            <div class="grid-x grid-margin-x">
                <div class="cell column medium-6">
                    <img id="restaurantModalImg">    
                </div>
                <div id="restaurantModalInfoContainer" class="cell column medium-6">
                    <h3 id="restaurantModalTitle"></h3>
                    <span>Info:</span>
                    <div id="ResaurantModalInfo">

                    </div>
                    
                </div>
            </div>
            <div id="RestaurantModalButtonContainer">
                        <button type="button" id="restaurantModalSave" class="search-cta">Save</button>
                        <a id="restaurantModalUrl" class="search-cta btn btn-secondary" target="_blank">View Restaurant</a>
                    </div>
        </dialog>
    `;
}
