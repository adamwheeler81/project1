$(document).ready(function() {

  // stand in variables for testing
  var ingredients = [];
  var restaurantSearches = [];

  // EDIT for templates
  // load landing page
  landingPage();


///////////////////////////////////////////////////////////////////
 //Search for recipes 
  
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
          var recipeCard = $("<div>", {
            id: response.results[i].id,
            class: "recipeCard"
          });
          recipeCard.append(
            $("<h5>", {
              html: response.results[i].title
            })
          );
          recipeCard.append(
            $("<img>", {
              src: imageRoot + response.results[i].image,
              alt: response.results[i].image,
              class: "recipeCardImg"
            })
          );

          $("#results").append(recipeCard);
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
      //sQueryObject.queryIngredients.push($("#mainInput").val());
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
    // EDIT to add templates

    getRecipes();
    resultsPage(getIngredientsSidebar(sQueryObject.queryIngredients));
    //showIngredients("sidebar");
  });



///////////////////////////////////////////////////////////////////
  //Search for Restaurant

  //Find user's geolocation
  function getGeolocation() {
    console.log("Geolocation working ")
  navigator.geolocation.getCurrentPosition(function(position) {
    zSettings.url =
      zQueryStr +
      'geocode?lat=' +
      position.coords.latitude +
      '&lon=' +
      position.coords.longitude;
    console.log
  })
  };

  //Get restaurant options
  function getRestaurants() {
    navigator.geolocation.getCurrentPosition(function(position) {
      zSettings.url =
        zQueryStr +
        'geocode?lat=' +
        position.coords.latitude +
        '&lon=' +
        position.coords.longitude;


      $.ajax(zSettings).done(function(res) {
        //If no gluten-free restuarants are found, display message
        if (res.nearby_restaurants.length == 0) {
          console.log("No recipes found. Please search again.");
          $("#results").text(
            "Sorry! No Gluten Tootin' approved restaurants found. Please revise your search terms and try again."
          );
        } else {
        console.log(res)
        
          //If restaurants are found
          for (var i = 0; i < res.nearby_restaurants.length; i++) {
            let current = res.nearby_restaurants[i].restaurant;
            let resultTotal = res.nearby_restaurants.length;

            //Results page 
              //Use template for results
              //Only need name, picture, and cuisine
              //Need to add something if there is no image
            console.log("Name: " + current.name);
            console.log("Image: " + current.featured_image);
            console.log("Cuisines: " + current.cuisines);
          };
        };
      });
    });
  };

  //Get restaurant details
  //Needs to turn into a click event added to each result within get Restaurants
  //Can we create a function to write all the html/add click event in one function?
  function getRestaurantDetails() {
    navigator.geolocation.getCurrentPosition(function(position) {
      zSettings.url =
        zQueryStr +
        'geocode?lat=' +
        position.coords.latitude +
        '&lon=' +
        position.coords.longitude;
      
      $.ajax(zSettings).done(function(res) {
        $('#results').empty();
        var newRestaurantDialog = $('<dialog>').attr(
          'id',
          'restaurants'
        );
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
          console.log("Address: " + current.location.address + ", " + 
            current.location.city + ", " + current.location.zipcode);

        }
        console.log(res)
        });
      });
  };


  $("#restaurantFind").on("click", /*"#sidebarSearch",*/ function(e) {
    console.log("click working")
    e.preventDefault();
    sQueryObject.queryRestaurants = restaurantSearches;

    getRestaurants();
    //getRestaurantDetails();
  });





});
