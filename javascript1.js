$(document).ready(function() {
  // TO DO:
  // styles for 'ingredients' class
  // create #searchArea (or change target id)
  // stand in variables for testing
  var ingredients = ["carrots", "butter", "chicken"];
  var recipeId = "374165";
  var imageRoot = "https://spoonacular.com/recipeImages/";

  // function for recipe ajax query.
  function getRecipeDetails(queryId) {
    // build results elements
    var newDialog = $("<dialog>", {
      id: "recipeInfo"
    });
    var newDiv = $("<div>", {
      class: "queryResult"
    });
    var newTitle = $("<h2>", {
      class: "recipeTitle"
    });

    // build query
    var query = sQueryStr + queryId + "/information";

    sSettings.url = query;

    $.ajax(sSettings).done(function(response) {
      console.log(response);
      newTitle.text(response.title);
      var steps = $("<div>", {
        id: "stepsDiv"
      });
      for (var i = 0; i < response.analyzedInstructions.length; i++) {
        steps.append(
          $("<h4>", {
            text: response.analyzedInstructions[i].name
          })
        );
        for (
          var j = 0;
          j < response.analyzedInstructions[i].steps.length;
          j++
        ) {
          steps.append(
            $("<span>", {
              class: "steps",
              text: response.analyzedInstructions[i].steps[j].step
            })
          );
          //console.log(response.analyzedInstructions[i].steps[j].step);
        }
      }

      newDiv.append(newTitle);
      newDiv.append(steps);
      newDialog.append(newDiv);
      // append dialog to #results and show
      $("#results").append(newDialog);
      newDialog.show();
    });
  }

  // Get recipe options from selected ingredients
  function getRecipes() {
    // build query
    var query =
      sQueryStr +
      "search?intolerances=gluten&number=" +
      $("#returnsSelect")
        .find(":selected")
        .text() +
      "&cuisine=" +
      sQueryObject.queryCuisine +
      "&type=" +
      sQueryObject.queryCourse +
      "&instructionsRequired=true&query=" +
      sQueryObject.queryIngredients;
    sSettings.url = query;
    $.ajax(sSettings).done(function(response) {
      if (response.results.totalResults == 0) {
        console.log("No recipes found. Please search again.");
        $("#results").text(
          "Sorry! I couldn't find a gluten free recipe that matched the search terms."
        );
      } else {
        // iterate through results and add recipes to list element inside of modal
        console.log(response);

        for (var i = 0; i < response.results.length; i++) {
          var newResult = $("<div>", {
            id: response.results[i].id,
            class: "recipeCard",
            html: response.results[i].title
          });
          newResult.append(
            $("<img>", {
              src: imageRoot + response.results[i].image,
              alt: response.results[i].image
            })
          );

          $("#results").append(newResult);
          //console.log(response.results[i]);
        }
      }
    });
  }

  // Get ingredients from array and print to target div
  function showIngredients(target) {
    // set the target div depending on the value of "target"
    var target = "sidebar" ? $("#ingredientsList") : $("#ingredientsMain");
    for (var i = 0; i < ingredients.length; i++) {
      target.append(
        $("<div>", {
          class: "ingredients",
          html: ingredients[i]
        })
      );
    }
  }

  // Build sidebar on search results page
  function showSidebar() {
    $("#root").append(
      $("<div>", {
        id: "sidebarContainer",
        class: "cell medium-auto medium-cell-block-container"
      })
    );
    $("#sidebarContainer").append(
      $("<div>", {
        id: "sidebarGrid",
        class: "grid-x grid-padding-x"
      })
    );

    // sidebar where search box and options go
    var sidebar = $("<div>", {
      id: "sidebar",
      class: "cell medium-4 medium-cell-block-y"
    });

    // fill in the sidebar
    sidebar.append(
      $("<h3>", {
        html: "Search Ingredients:"
      })
    );
    sidebar.append(
      $("<input>", {
        type: "search",
        placeholder: "Search:"
      })
    );
    sidebar.append(
      $("<div>", {
        id: "ingredient-pill-box"
      })
    );
    //$("#ingredient-pill-box").empty();
    for (var i = 0; i < ingredients.length; i++) {
      console.log(ingredients[i]);
      $("#ingredient-pill-box").append(
        $("<div>", {
          class: "ingredient-pill",
          html: ingredients[i]
        })
      );
    }
    sidebar.append(
      $("<input>", {
        id: "sidebarSearch",
        type: "submit",
        value: "Submit"
      })
    );
    $("#sidebarGrid").append(sidebar);
    $("#sidebarContainer").append(sidebar);
  }

  function showResults() {
    // results container for search results
    var resultsContainer = $("<div>", {
      id: "resultsContainer",
      class: "cell medium-8 medium-cell-block-y"
    });

    resultsContainer.append(
      $("<h3>", {
        text: "Recipe Search Results:"
      })
    );

    resultsContainer.append(
      $("<div>", {
        id: "results"
      })
    );
    $("#sidebarContainer").append(resultsContainer);
  }

  $(document).on("click", "#sidebarSearch", function(e) {
    e.preventDefault();
    sQueryObject.queryIngredients = ingredients;
    getRecipes();
  });

  $("#mainInput").on("keypress", function(e) {
    /*  e.preventDefault(); */
    if (e.which == 13) {
      ingredients.push($("#mainInput").val());
      $("#ingredient-pill-box").empty();
      //showIngredients("main");
      for (var i = 0; i < ingredients.length; i++) {
        $("#ingredient-pill-box").append(
          $("<div>", {
            class: "ingredient-pill",
            html: ingredients[i]
          })
        );
      }
    }
  });

  $("#mainFind").on("click", function() {
    $("#root").empty();
    showSidebar();
    showResults();
    //showIngredients("sidebar");
  });
});
