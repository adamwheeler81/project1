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
        <button type="button" id="mainFind" class="search-cta btn btn-secondary">
          Find a recipe
        </button>

        <button type="button" class="search-cta btn btn-secondary">
          Find a restaurant
        </button>
      </div>
    </div>
  </div>
</div>
`);
}

function resultsPage(ingredients, results) {
  $("#root").empty();
  $("#root").html(`
        <div id="resultsContainer" class="cell medium-auto medium-cell-block-container">
            <div id="resultsGrid" class="grid-x grid-padding-x">
                <div id="sidebar" class="cell medium-4 medium-cell-block-y">
                    <h3>Search Ingredients:</h3>
                    <input type="search" placeholder="Search"></input>
                    <div id="ingredient-pill-box">
                        ${ingredients.map(
                          (ingredient, index) =>
                            `<div class="ingredient-pill" id=${index}>${ingredient}</div>`
                        )}
                    </div>
                    <input id="sidebarSearch" type="submit" value="Submit">
                </div>
                <div id="resultsContainer"  class="cell medium-8 medium-cell-block-y">
                <h3>Recipe Search Results:</h3>
                    <div id="results">
                    ${typeof results == "undefined" ? `` : results} 
                    </div>
                </div>

            </div>
        </div> 
    `);
}
