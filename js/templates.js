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

function getIngredientsSidebar(ingredients) {
  return `
    <h3>Search Ingredients:</h3>
    <input type="text" id="mainInput"></input>
    <div id="ingredient-pill-box">
        ${ingredients.map(
          (ingredient, index) =>
            `<div class="ingredient-pill" id=${index}>${ingredient}</div>`
        )}
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
            <h3 id="recipeModalTitle"></h3>
            <p id="recipeModalInfo"><p>
            <img id="recipeModalImg">
            <div id="recipeModalSteps">
                <ul id="recipeModalList">
                </ul>
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
