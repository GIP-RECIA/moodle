$(function() {
	$("#loading").hide();
	$("#tabs").show(); 
	$("#tabs").tabs();
	
	// Si l'affichage est large 
	if($("#tabs").width() >= 944) {
		
		// On masque le menu hamburger
		$('#hamburger').css("display", "none");
		$('#tab-container').css("opacity", "1.0");
		$('#tab-container').show();
		$('#main-container').css("margin", "0 0 0 300px");
	
	// Si l'affichage n'est pas très large
	} else {
		
		// Lorsqu'on clique sur le menu
		$("#hamburger").click(function() {
			$("#tab-container").css("position", "fixed");
			$("#tab-container").css("top", $("#hamburger").offset().top - 4);
			displayMenu($("#tab-container").is(":hidden"));
	    });
		
		// Lorsqu'on clique sur un élément du menu
	    $("#tab-container li").click(function() {
			displayMenu(false);
	    });
	}
	
	// On replace le filtre par rôle si nécessaire
	var topSortSelect = $("select[name='sortOrder']").position().top;
	var topFilterSpan = $("select[name='sortOrder']").next().position().top;
	var topFilterSelect = $("select[name='sortOrder']").next().next().position().top;
	if(Math.abs(topFilterSpan - topFilterSelect) > 5) {
		$("select[name='sortOrder']").css("display", "block");
	}
	if(Math.abs(topSortSelect - topFilterSelect) > 5) {
		$("select[name='sortOrder']").css("margin-bottom", "10px");					
	}
});

/**
 * visible = true : ouvre le menu
 * visible = false : ferme le menu  
 */
function displayMenu(visible) {
	if(visible) {
		var tagToDisplay = $("#tab-container");
		var tagToHide = $("#main-container");
		var marginLeft = "305px";
	} else {
		var tagToDisplay = $("#main-container");
		var tagToHide = $("#tab-container");
		var marginLeft = "0px";
	}

	tagToDisplay.show();
	tagToHide.animate({opacity: '0.0'}, "slow", function() {
		tagToHide.hide();
	    $("#hamburger").animate({"marginLeft": [marginLeft, 'easeOutExpo']}, {
		    duration: 700,
            complete: function () {
            	tagToDisplay.animate({opacity: '1.0'}, "slow");
        	}
		});
	});
}