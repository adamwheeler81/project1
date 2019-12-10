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

//Build resultsPage static html
function resultsPage(sidebar) {
  $("#root").empty();
  $("#root").html(`
        <div id="resultsContainer" class="cell medium-auto medium-cell-block-container">
            <div id="resultsGrid" class="grid-x grid-padding-x">
                <div id="sidebar" class="cell medium-4 medium-cell-block-y">
                    ${sidebar}
                </div>
                <div id="resultsContainer"  class="cell medium-8 medium-cell-block-y">
                <h3>Recipe Search Results:</h3>
                    <div id="results"> 
                    
                    </div>
                </div>

            </div>
        </div> 
    `);
}

//Build recipe sidebar
function getIngredientsSidebar(ingredients) {
  return `
    <h3>Search Ingredients:</h3>
    <input type="search" placeholder="Search"></input>
    <div id="ingredient-pill-box">
        ${ingredients.map(
          (ingredient, index) =>
            `<div class="ingredient-pill" id=${index}>${ingredient}</div>`
        )}
    </div>
    <input id="sidebarSearch" type="submit" value="Submit"></input>`;
}


//Build restaurants sidebar
function getRestaurantsSidebar(restaurantSearches) {
  return `
    <h3>Search Cuisines:</h3>
    <input type="search" placeholder="Search"></input>
    <div id="ingredient-pill-box">
        ${restaurantSearches.map(
          (restaurantSearchTerm, index) =>
            `<div class="ingredient-pill" id=${index}>${restaurantSearchTerm}</div>`
        )}
    </div>
    <input id="sidebarSearch" type="submit" value="Submit"></input>`;
}

//Build Restuarant card with details
function getRestaurantCard(restaurant) {
  return `
        <div id="${restaurant.id}" class="restaurantCard cell medium-3">
            <h5>${restaurant.name}</h5>
            <img src="${imageRoot + restaurant.featured_image}" 
            alt="${restaurant.featured_image}" class="restaurantCardImg">
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
