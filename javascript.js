$(document).ready(function() {
	// helper function to make appending elements more readable
	function appendChild(tag, childId, childClassName, content, parentId) {
		var newChild = $('<' + tag + '>', {
			id: childId,
			className: childClassName,
			html: content
		});
		var parentElement = $('#' + parentId);
		parentElement.append(newEl);
	}

	// create #options modal and populate it with query options
	function showOptions() {
		var newDialog = $('<dialog>', {
			id: 'options'
		});

		// course
		newDialog.append(
			$('<h3>', {
				id: 'courseHeader',
				className: 'optionHeader',
				text: 'Course'
			})
		);
		newDialog.append(
			$('<div>', {
				id: 'courseDiv',
				className: 'optionDiv'
			})
		);

		// ingredients
		newDialog.append(
			$('<h3>', {
				id: 'ingredientsHeader',
				className: 'optionHeader',
				text: 'Ingredients'
			})
		);
		newDialog.append(
			$('<div>', {
				id: 'ingredientsDiv',
				className: 'optionDiv'
			})
		);

		// cuisine
		newDialog.append(
			$('<h3>', {
				className: 'optionHeader',
				id: 'cuisineHeader',
				text: 'Cuisine'
			})
		);
		newDialog.append(
			$('<div>', {
				id: 'cuisineDiv',
				className: 'optionDiv'
			})
		);
		$('#results').empty();
		$('#results').append(newDialog);
		for (var i = 0; i < courses.length; i++) {
			var newItem = $('<div>', {
				id: courses[i],
				class: 'optionsBtn',
				'data-type': 'courses',
				type: 'button',
				text: courses[i]
			});
			$('#courseDiv').append(newItem);
		}
		for (var i = 0; i < ingredientsList.length; i++) {
			var newItem = $('<div>', {
				id: ingredientsList[i],
				class: 'optionsBtn',
				'data-type': 'ingredients',
				type: 'button',
				text: ingredientsList[i]
			});
			$('#ingredientsDiv').append(newItem);
		}
		for (var i = 0; i < cuisine.length; i++) {
			var newItem = $('<div>', {
				id: cuisine[i],
				class: 'optionsBtn',
				'data-type': 'cuisine',
				type: 'button',
				text: cuisine[i]
			});
			$('#cuisineDiv').append(newItem);
		}

		// submit div
		var submitDiv = $('<div>', {
			id: 'submitDiv'
		});
		var submitSpan = $('<span>', {
			id: 'submitSpan',
			html: 'Results:&nbsp;&nbsp;'
		});
		var submitBtn = $('<button>', {
			id: 'submitBtn',
			text: 'Search'
		});
		var newSelect = $('<select>', {
			id: 'returnsSelect'
		});
		// requests with return are currently not working...
		for (var i = 0; i < returns.length; i++) {
			newSelect.append(
				$('<option>', {
					value: returns[i],
					text: returns[i]
				})
			);
		}
		submitSpan.append(newSelect);
		submitDiv.append(submitSpan);
		submitDiv.append(submitBtn);

		newDialog.append(submitDiv);
		newDialog.show();
	}

	// function for recipe ajax query.
	function getRecipeDetails(queryId) {
		// build results elements
		var newDialog = $('<dialog>').attr('id', 'recipeInfo');
		var newDiv = $('<div>').addClass('queryResult');
		var newTitle = $('<h2>').addClass('recipeTitle');
		var newSummary = $('<p>').addClass('recipeSummary');

		// build query
		var query = sQueryStr + queryId + '/summary';
		sSettings.url = query;

		$.ajax(sSettings).done(function(response) {
			newTitle.text(response.title);
			newSummary.html(response.summary);
			newDiv.append(newTitle);
			newDiv.append(newSummary);
			newDialog.append(newDiv);
			// append dialog to #results and show
			$('#results').append(newDialog);
			newDialog.show();
		});
	}

	// Get recipe options from selected ingredients
	function getRecipes() {
		// build new parent elements
		var newDialog = $('<dialog>').attr('id', 'recipeList');
		var newDiv = $('<div>').addClass('queryResult');

		// build query
		var query =
			sQueryStr +
			'search?intolerances=gluten&number=' +
			$('#returnsSelect')
				.find(':selected')
				.text() +
			'&cuisine=' +
			sQueryObject.queryCuisine +
			'&type=' +
			sQueryObject.queryCourse +
			'&query=' +
			sQueryObject.queryIngredients;
		sSettings.url = query;
		console.log(query);
		$.ajax(sSettings).done(function(response) {
			if (response.results.totalResults == 0) {
				console.log('No recipes found. Please search again.');
				newDiv.text(
					"Sorry! I couldn't find a gluten free recipe that matched the search terms."
				);
			} else {
				// iterate through results and add recipes to list element inside of modal
				var newList = $('<ul>');
				for (var i = 0; i < response.results.length; i++) {
					var newListItem = $('<li>')
						.addClass('listItem')
						.attr('id', response.results[i].id);
					newListItem.text(response.results[i].title);
					newList.append(newListItem);
					console.log(response.results[i].title);
				}
				newDiv.append(newList);
			}
			newDialog.append(newDiv);
			// append dialog to #results and show
			$('#results').append(newDialog);
			newDialog.show();
		});
	}

	// Extensible ajax function...create helper functions to build HTML depending on the objType.
	// queryStr is the query for the GET request.
	// objType tells the function what kind of object to expect in response.
	/*   function getQueryResponse(objType, req) {
    $.ajax(req).done(function(res) {
      console.log(res);
      console.log("add logic to call functions as needed here...");
      if (objType == "options") {
        // run function to get recipe list
      } else if (objType == "recipes") {
        // run function to get selected recipe details
      } else {
        // yelp or whatever...
      }
    });
  } */

	// event handlers
	$('.searchRecipes').on('click', function() {
		// refresh object
		queryObject = {
			queryIngredients: [],
			queryCourse: '',
			queryCuisine: ''
		};
		showOptions();
	});

//Search restaurants
	$('.searchRestaurants').on('click', function() {

		//Will need click button in menu
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
					console.log(res.nearby_restaurants[i].restaurant.name);
					var newRestaurantDiv = $('<div>').addClass('restaurant');
					var newRestaurantName = $('<h3>').addClass(
						'restaurantName'
					);
					var newRestaurantAddress = $('<h4>').addClass(
						'restaurantAddress'
					);
					var newRestaurantInfo = $('<p>').addClass('restaurantInfo');
					var newRestaurantMenu = $('<button>').addClass('restaurantInfo');

					newRestaurantName.text(
						res.nearby_restaurants[i].restaurant.name
					);
					newRestaurantDiv.append(newRestaurantName);

					newRestaurantAddress.text(
						res.nearby_restaurants[i].restaurant.location.address
					);
					newRestaurantDiv.append(newRestaurantAddress);

					newRestaurantInfo.text(
						res.nearby_restaurants[i].restaurant.cuisines
					);
					newRestaurantDiv.append(newRestaurantInfo);
				
				//Working on linking buttons to menu urls
				//attempted to add attribute
				//attempted to replace the url
				//Will continue to work on
					newRestaurantMenu.text(
						"Go to Menu"
						//res.nearby_restaurants[i].restaurant.menu_url
					);
					newRestaurantDiv.append(newRestaurantMenu.attr("src", res.nearby_restaurants[i].restaurant.menu_url));
					newRestaurantMenu.on('click', function() {
						console.log(res.nearby_restaurants[i].restaurant.menu_url)
						//window.location.replace(JSON.stringify(res.nearby_restaurants[i].restaurant.menu_url));
					})
					console.log(res);


					//Append the above info into the dialog box
					newRestaurantDialog.append(newRestaurantDiv);

				

				}

				$('#results').append(newRestaurantDialog);
				newRestaurantDialog.show();
			});
		});
	});

	// get the selected option and add it to the corresponding array
	$(document).on('click', '.optionsBtn', function() {
		// toggle button class to show which options are selected
		$(this).toggleClass('addedOpt');
		// check sibling objects and toggle their class if they have been previously selected (for course and cuisine only)
		if ($(this).attr('data-type') == 'courses') {
			$(this)
				.siblings('.addedOpt')
				.removeClass('addedOpt');
			sQueryObject.queryCourse = $(this).attr('id');
		} else if ($(this).attr('data-type') == 'cuisine') {
			$(this)
				.siblings('.addedOpt')
				.removeClass('addedOpt');
			sQueryObject.queryCuisine = $(this).attr('id');
		} else {
			if (
				sQueryObject.queryIngredients.indexOf($(this).attr('id')) > -1
			) {
				// remove this ingredient
				sQueryObject.queryIngredients.splice(
					$.inArray(
						$(this).attr('id'),
						sQueryObject.queryIngredients
					),
					1
				);
			} else {
				sQueryObject.queryIngredients.push($(this).attr('id'));
			}
			console.log(sQueryObject.queryIngredients);
		}
	});

	// Event handler for submit button on options modal. Send query criteria to AJAX
	$(document).on('click', '#submitBtn', function(e) {
		// clear modal from results div
		$('#results').empty();
		// send search query and show results
		getRecipes();
	});

	// Get recipe detail when clicked.
	$(document).on('click', '.listItem', function() {
		// clear modal from results div
		$('#results').empty();
		// query for the selected recipe and show results
		getRecipeDetails($(this).attr('id'));
	});
});
