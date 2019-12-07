$(document).ready(function() {
  // stand in variables for testing
  var ingredients = [];

  // EDIT for templates
  // load landing page
  landingPage();

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
      if (response.totalResults == 0) {
        $("#results").text(
          "Sorry! I couldn't find a gluten free recipe that matched the search terms."
        );
      } else {
        // iterate through results
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
          $("#results").append(getRecipeCard(response.results[i]));
        }
      }
    });
  }

  // Get ingredients from array and print to target div
  /* function showIngredients(target) {
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
    } */

  $(document).on("click", "#sidebarSearch", function(e) {
    e.preventDefault();
    sQueryObject.queryIngredients = ingredients;
    getRecipes();
  });

  $("#mainInput").on("keypress", function(e) {
    if (e.which == 13) {
      // add new ingredient to array
      sQueryObject.queryIngredients.push($("#mainInput").val());
      // clear input
      $("#mainInput").val("");
      $("#ingredient-pill-box").empty();
      for (var i = 0; i < sQueryObject.queryIngredients.length; i++) {
        $("#ingredient-pill-box").append(
          $("<div>", {
            class: "ingredient-pill",
            html: sQueryObject.queryIngredients[i]
          })
        );
      }
    }
  });

  $("#recipeFind").on("click", function() {
    $("#root").empty();
    resultsPage(getIngredientsSidebar(sQueryObject.queryIngredients));
    getRecipes();
  });
});

$("#restaurantFind").on("click", function() {
  $("#root").empty();
  resultsPage(getRestaurantSidebar());
  getRestaurants();
});
