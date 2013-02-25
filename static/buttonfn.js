//functions for the buttons on the page, basically toggles the various pages
//dom manipulation is beautiful
$(document).ready(function(){
	hideEverything();
	$('#welcomePage').show();
	console.log("loaded!");

});

$('#menuview').click(function(){
	
	hideEverything();
	$('#displayRecipe').show();
	$('#menuedit').show();
	$('#menudelete').show();
	getRandomRecipe();
});

$('#menunew').click(function(){
	
	hideEverything();
	$('#newRecipe').show();
});

$('#menusearch').click(function(){
	
	hideEverything();
	$('#searchRecipe').show();
});

$('#menuedit').click(function(){
	
	hideEverything();
	$('#editRecipe').show();
});

function hideEverything(){
	
	$('#newRecipe').hide();
	$('#searchRecipe').hide();
	$('#editRecipe').hide();
	$('#deleteRecipe').hide();
	$('#displayRecipe').hide();
	$('#welcomePage').hide();
	$('#menuedit').hide();
	$('#menudelete').hide();
}