//client.js the clientside service

//global for all recipe storage
var recipeList;

// addRecipe: Adds a recipe from the text fields in the html to
// the server recipeList.
function addRecipe(){
	// Get the text fields.
		var titleInput = $("#name");
		var ingredientsInput = $("#ingre");
		var directionsInput = $("#dir");
		var imageURLInput = $("#foodpic");
		
		console.log(titleInput.val());
		console.log(ingredientsInput.val());
		console.log(directionsInput.val());
		console.log(imageURLInput.val());
		
		// Add fields to the listing.
		add(titleInput.val(), ingredientsInput.val(), directionsInput.val(),
			imageURLInput.val());
	
		//Reset the text fields.
		titleInput.val("");
		ingredientsInput.val("");
		directionsInput.val("");
		imageURLInput.val("");
}

function getRandomRecipe(){
	if(recipeList.length === 0){
		alert("ERROR: No recipes found!");
	}
	else{
		var randomID = Math.floor(Math.random()*recipeList.length);
		getRecipe(randomID);
	}
}

function loadRecipe(data){
	var item = 
		{"title" : data.recipeList.title,
		"ingredients" : data.recipeList.ingredients,
		"directions" : data.recipeList.directions,
		"imageURL" : data.recipeList.imageURL};
		
	var titleid = $("#displayText");
  	titleid.html("");
  	var ingreid = $("#inScroll");
  	ingreid.html("");
  	var dirid = $("#dirScroll");
  	dirid.html("");
	
	var title = $("<h4>").html(item.title);
	var ingredients = $("<p>").html(item.ingredients);
	var directions = $("<p>").html(item.directions);
	var imageURL = $("<p>").html(item.imageURL);
	
	titleid.append(title);
	titleid.append("<br>");
	ingreid.append("<br><h5>Ingredients: </h5><br>");
	ingreid.append(ingredients);
	dirid.append("<br><h5>Directions: </h5><br>");
	dirid.append(directions);
	//imageURL: deal with later
	
	
}

// refresh: refreshes the html; redirects to new page? may have to
// specify the "refresh" function based on what type of command
// we are executing.
function refresh(){
	// Check if the client-side version of the recipeList exists.
	if (recipeList === undefined){
		alert("Error: No recipe list found!");
		return;
	}
	
	if (arguments.length > 0){
		loadRecipe(arguments[0]);
	}
	
	console.log("refreshing...");	
}

/*
 * get(): Gets all recipes. Used for browsing recipes.
*/
function get(){
	 $.ajax({
      type: "get",
      url: "/recipeList",
      success: function(data) {
        recipeList = data.recipeList;
				console.log("GET");
				console.log(recipeList);
        refresh();
      }
    });
}

/*
 * getRecipe(): Gets a single recipe. Used for reading, editing, or
 * deleting a preexisting recipe.
*/
	function getRecipe(id){
	 $.ajax({
    type: "get",
		url: "/recipeList/" + encodeURI(id),
		success: function(data) {
			refresh(data);
		}
  });
}

/*
 * getRecipePage(): Gets a page of recipes. 
 * NOT YET IMPLEMENTED
*/

/*
 * add(): Adds a recipe to the recipe list.
*/
function add(title, ingredients, directions, imageURL){
	console.log("adding recipe...");
	$.ajax({
      type: "post",
      data: {"title": title, "ingredients": ingredients, 
				"directions": directions, "imageURL": imageURL},
      url: "/recipeList",
      success: function(data) { 
				console.log("Add success!");
				recipeList.push({
					title: title,
					ingredients: ingredients,
					directions: directions,
					imageURL: imageURL
				});
				refresh();
			}
    });
		
		console.log("recipe added!");
}

/*
 * edit(id): Edits a preexisting recipe with the id "id".
*/
function edit(id){
	$.ajax({
      type: "put",
      data: {"title": title, "ingredients": ingredients, 
				"directions": directions, "imageURL": imageURL},
      url: "/recipeList/" + id,
      success: function(data) { 
				var recipe = recipeList[id];
				
				recipe.title = (title !== undefined) ? recipe.title : title;
				recipe.ingredients = (ingredients !== undefined) ? 
					recipe.ingredients : ingredients;
				recipe.directions = (directions !== undefined) ? 
					recipe.directions : directions;
				recipe.imageURL = (imageURL !== undefined) ? 
					recipe.imageURL : imageURL;
				
				refresh();
			}
    });
}

/*
 * del(id): Deletes a preexisting recipe with the id "id".
*/
function del(id){
	$.ajax({
      type: "delete",
      url: "/recipeList/" + id,
      success: function(data) { 
				recipeList.splice(id, 1);
				refresh();
      }
    });
}

$(document).ready(function() {
	get();
});