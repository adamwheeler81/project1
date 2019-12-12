$(document).ready(function() {
  // load landing page
  landingPage();

  // Helper functions

  function printIngredients() {
    $("#ingredient-pill-box").empty();
    for (var i = 0; i < sQueryObject.queryIngredients.length; i++) {
      $("#ingredient-pill-box").append(
        $("<div>", {
          class: "ingredient-pill",
          html:
            sQueryObject.queryIngredients[i] +
            "&nbsp;&nbsp;<span id='" +
            i +
            "' class='ingRemove'>x</span>"
        })
      );
    }
  }

  ///////////////////////////////////////////////////////////////////
  //Search for recipes

  // function for recipe ajax query.
  function getRecipeDetails(queryId) {
    // build query
    var query = sQueryStr + queryId + "/information";
    sSettings.url = query;

    $.ajax(sSettings).done(function(response) {
      //console.log(response);
      $("#recipeModalIngredients").empty();
      $("#recipeModalTitle").text(response.title);
      $("#recipeModalImg").attr("src", response.image);
      for (var i = 0; i < response.extendedIngredients.length; i++) {
        $("#recipeModalIngredients").append(
          $("<li>", {
            class: "recipeModalIngredient",
            html: response.extendedIngredients[i].name
          })
        );
      }
      $("#recipeModalUrl").attr("href", response.sourceUrl);
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
        for (var i = 0; i < response.results.length; i++) {
          $("#results").append(getRecipeCard(response.results[i]));
        }
      }
    });
  }

  // EVENT HANDLERS
  $(document).on("click", "#recipeFind", function() {
    $("#root").empty();
    resultsPage(getIngredientsSidebar(sQueryObject.queryIngredients));
    getRecipes();
  });

  $("#restaurantFind").on("click", function() {
    $("#root").empty();
    resultsPage(getRestaurantSidebar());
    getRestaurants();
  });

  // When enter is pressed on one of the ingredient input elements, add the input value to the ingredients array
  $(document).on("keypress", "#mainInput", function(e) {
    if (e.which == 13) {
      // add new ingredient to array
      sQueryObject.queryIngredients.push($("#mainInput").val());
      // clear input
      $("#mainInput").val("");
      printIngredients();
    }
  });

  // handle ingredient removal
  $(document).on("click", ".ingRemove", function() {
    sQueryObject.queryIngredients.splice($(this).attr("id"), 1);
    printIngredients();
  });

  // show recipes when clicking the recipe card
  $(document).on("click", ".recipeCard", function() {
    $("#results").append(getRecipeModal());
    getRecipeDetails($(this).attr("id"));
    $("#recipeModal").show();
  });

  ///////////////////////////////////////////////////////////////////
  //Search for Restaurant

  //Find user's geolocation
  function getGeolocation() {
    console.log("Geolocation working ");
    navigator.geolocation.getCurrentPosition(function(position) {
      zSettings.url =
        zQueryStr +
        "geocode?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude;
      console.log;
    });
  }

  //Get restaurant options
  function getRestaurants() {
    navigator.geolocation.getCurrentPosition(function(position) {
      zSettings.url =
        zQueryStr +
        "geocode?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude;

      $.ajax(zSettings).done(function(res) {
        //If no gluten-free restuarants are found, display message
        if (res.nearby_restaurants.length == 0) {
          console.log("No recipes found. Please search again.");
          $("#results").text(
            "Sorry! No Gluten Tootin' approved restaurants found. Please revise your search terms and try again."
          );
        } else {
          console.log(res);

          //If restaurants are found
          for (var i = 0; i < res.nearby_restaurants.length; i++) {
            let current = res.nearby_restaurants[i].restaurant;
            let resultTotal = res.nearby_restaurants.length;
            $("#results").append(getRestaurantCard(current));

            //Results page
            //Use template for results
            //Only need name, picture, and cuisine
            //Need to add something if there is no image
            console.log("Name: " + current.name);
            console.log("Image: " + current.photos_url);
            console.log("Cuisines: " + current.cuisines);
          }
        }
      });
    });
  }

  //Get restaurant details
  //Needs to turn into a click event added to each result within get Restaurants
  //Can we create a function to write all the html/add click event in one function?
  function getRestaurantDetails() {
    navigator.geolocation.getCurrentPosition(function(position) {
      zSettings.url =
        zQueryStr +
        "geocode?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude;

      $.ajax(zSettings).done(function(res) {
        $("#results").empty();
        var newRestaurantDialog = $("<dialog>").attr("id", "restaurants");
        for (var i = 0; i < res.nearby_restaurants.length; i++) {
          let current = res.nearby_restaurants[i].restaurant;

          //Details pop-up
          //Use template for results
          //Only need name and picture
          //Need to add something if there is no image
          //Nee to add something if there is no link to menu
          console.log("Name: " + current.name);
          console.log("Image: " + current.featured_image);
          console.log("Cuisines: " + current.cuisines);
          console.log("Price Range: " + current.price_range);
          console.log("User Rating: " + current.user_rating.aggregate_rating);
          console.log("Link to Menu: " + current.menu_url);
          console.log(
            "Address: " +
              current.location.address +
              ", " +
              current.location.city +
              ", " +
              current.location.zipcode
          );
        }
        console.log(res);
      });
    });
  }

  $(document).on("click", "#restaurantFind", function(e) {
    console.log("click working");
    e.preventDefault();
    getRestaurants();
    resultsPage(getRestaurantsSidebar);
    //sQueryObject.queryRestaurants = restaurantSearches;
  });

  $(document).on("click", "#sidebarSearch", function(e) {
    e.preventDefault();
    getRestaurants();
    sQueryObject.queryCuisine = restaurant;
  });

  //click event on restaurant card
});
