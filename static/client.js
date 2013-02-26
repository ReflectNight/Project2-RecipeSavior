//client.js the clientside service

//global for all recipe storage
var recipeList;

window.onload = function() {
	// When the Delete button is clicked, delete the block.
	$("#menudelete").click(function() {
		var element = $("#displayText");
		var id = parseInt(element.attr("data-recipe-id"), 10);
	
		if (recipeList.length !== 0){
			console.log("Delete called.");
			del(id);
			
			recipeList.splice(id, 1);
		}
		
		console.log("Current id: " + id);
		console.log("Current length: " + recipeList.length);
		
		if(recipeList.length === 0){
			var titleid = $("#displayText");
			titleid.html("");
			var ingreid = $("#inScroll");
			ingreid.html("");
			var dirid = $("#dirScroll");
			dirid.html("");
	
			alert("ERROR: No recipes found!");
			hideEverything();
			$('#newRecipe').show();
		}
		else if (id === recipeList.length){
			getRecipe(0);
		}
		else {
			getRecipe(id);
		}
	});
	
	$('#menuedit').click(function(){
		var element = $("#displayText");
		var id = parseInt(element.attr("data-recipe-id"), 10);
		
		hideEverything();
		$('#editRecipe').show();
		
		$("#editRecipe").attr("data-recipe-id", id);
		
		var titleInput = $("#editTitle");
		var ingredientsInput = $("#editIngre");
		var directionsInput = $("#editDir");
		var imageURLInput = $("#editFoodlink");
		
		console.log("Ingredients: " + recipeList[id].ingredients);
		
		titleInput.removeAttr("value");
		ingredientsInput.html("");
		directionsInput.html("");
		imageURLInput.removeAttr("value");
		
		titleInput.attr("value", recipeList[id].title);
		ingredientsInput.html(recipeList[id].ingredients);
		directionsInput.html(recipeList[id].directions);
		imageURLInput.attr("value", recipeList[id].imageURL);
		
	});
	
// When the Edit button is clicked, redirect to editing page.
	$("#editBtn").click(function() {
		var id = $("#editRecipe").attr("data-recipe-id");
	
		var titleInput = $("#editTitle");
		var ingredientsInput = $("#editIngre");
		var directionsInput = $("#editDir");
		var imageURLInput = $("#editFoodLink");
		
		edit(id, titleInput.val(), ingredientsInput.val(), directionsInput.val(),
			imageURLInput.val());
			
		hideEverything();
		$('#displayRecipe').show();
		$('#menuedit').show();
		$('#menudelete').show();
		getRecipe(id);
	});
}

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
}

function getRandomRecipe(){
	$('#displayRecipe').show();

	if(recipeList.length === 0){
		alert("ERROR: No recipes found!");
		hideEverything();
		$('#newRecipe').show();
	}
	else{
		var randomID = Math.floor(Math.random()*recipeList.length);
		getRecipe(randomID);
	}
}

function loadRecipe(id, data){
	console.log(data);
	var item = 
		{"title" : data.title,
		"ingredients" : data.ingredients,
		"directions" : data.directions,
		"imageURL" : data.imageURL};
	
	var titleid = $("#displayText");
  titleid.html("");
  var ingreid = $("#inScroll");
  ingreid.html("");
  var dirid = $("#dirScroll");
  dirid.html("");
	
	item.ingredients = "\n"+item.ingredients
	item.ingredients = item.ingredients.split("\n").join("<br />- ");

	item.directions = item.directions.split("\n").join("<br /><br />");

	var title = $("<h4>").html(item.title);
	var ingredients = $("<p>").html(item.ingredients);
	var directions = $("<p>").html(item.directions);
	var imageURL = $("<p>").html(item.imageURL);
	
	titleid.append(title);
	titleid.append("<br>");
	ingreid.append("<br><h5>Ingredients: </h5>");
	ingreid.append(ingredients);
	dirid.append("<br><h5>Directions: </h5><br>");
	dirid.append(directions);
	//imageURL: deal with later
	
	$("#displayText").attr("data-recipe-id",id);

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
	
	if (arguments.length === 2){
		loadRecipe(arguments[0], arguments[1]);
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
			console.log("returned: ");
			console.log(data.item);
			recipeList[id] = data.item;
			refresh(id, data.item);
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
				if (data.success){
					var titleInput = $("#name");
					var ingredientsInput = $("#ingre");
					var directionsInput = $("#dir");
					var imageURLInput = $("#foodpic");
				
					//Reset the text fields.
					titleInput.val("");
					ingredientsInput.val("");
					directionsInput.val("");
					imageURLInput.val("");
				
					recipeList.push({
						title: title,
						ingredients: ingredients,
						directions: directions,
						imageURL: imageURL
					});
					refresh();
				}
				else{
					alert("Fill in all fields!");
				}
			}
    });
}

/*
 * edit(id): Edits a preexisting recipe with the id "id".
*/
function edit(id, title, ingredients, directions, imageURL){
	$.ajax({
      type: "put",
      data: {"title": title, "ingredients": ingredients, 
				"directions": directions, "imageURL": imageURL},
      url: "/recipeList/" + id,
      success: function(data) { 
				if(data.success){
					var recipe = recipeList[id];
					
					recipe.title = (title !== undefined) ? title : recipe.title;
					recipe.ingredients = (ingredients !== undefined) ? 
						ingredients : recipe.ingredients;
					recipe.directions = (directions !== undefined) ? 
						directions : recipe.directions;
					recipe.imageURL = (imageURL !== undefined) ? 
						imageURL : recipe.imageURL;
					
					refresh();
				}
				else{
					alert("Fill in all fields!");
				}
			}
    });
}

/*
 * del(id): Deletes a preexisting recipe with the id "id".
*/
function del(id){
	console.log("Deleting " + id);

	$.ajax({
      type: "delete",
      url: "/recipeList/" + id,
      success: function(data) {}
    });
}

/*
$('#viewRarrow').click(function(){
	console.log("next");
	var element = $(this).parent();
	var id = element.attr("id");
	var nxt = id+1;
	if (id>recipeList.length)
		nxt=1;
	console.log(nxt);
	console.log(recipeList[nxt]);
	loadRecipe(nxt, recipeList[nxt]);
	
});

$('#viewLarrow').click(function(){
	console.log("prev");
	var element = $(this).parent();
	var id = element.attr("id");
	var prev =id-1;
	if(prev===0)
		prev=recipeList.length;
	console.log(prev);
	console.log(recipeList[prev]);
	loadRecipe(prev, recipeList[prev]);
	
	
});*/


$(document).ready(function() {
	get();
});