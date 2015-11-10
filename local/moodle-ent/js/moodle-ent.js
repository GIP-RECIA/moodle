/*
 * Sur IE, à chaque fois que l'on clique sur "Afficher le résumé" ou "Afficher les enseignants",
 * l'évènement $(window).resize est appelé, ce qui peut provoquer une boucle infinie selon les cas.
 * Pour éviter ce comportement, on vérifie si la largeur du navigateur a été modifiée.  
 */
var lastDocumentWidth;

$(function() {
	$("#loading").hide();
	$("#tabs").show(); 
	$("#tabs").tabs();
	
	// On affiche les flèches devant "Afficher les enseignants"
    $("#tabs-1 .block-hider-show").css("background-image", "url('" + themeUrl + "/collapsed')");
    $("#tabs-1 .block-hider-hide").css("background-image", "url('" + themeUrl + "/expanded')");
    
    configDisplay(false);
    lastDocumentWidth = $(document).width();
    
    $(window).resize(function() {
    	if(window.navigator.appName.indexOf("Internet Explorer") == -1 || $(document).width() != lastDocumentWidth) {
    		lastDocumentWidth = $(document).width();    
    		configDisplay(true);
    	}
    });
});

function configDisplay(isResized) {
	configMenu(isResized);
	configSummary();
}

/**
 * Affiche le menu hamburger selon la taille du module
 */
function configMenu(isResized) {
	var menuIcon 	= $("#hamburger");
	var menu 		= $("#tab-container");
	var menuOption 	= $("#tab-container li");
	var courses 	= $("#main-container");
	menuOption.unbind("click");
	
	// Si l'affichage est large 
	if($("#tabs").width() >= 944) {
		
		// On masque le menu hamburger
		menuIcon.hide();
		menu.css("opacity", "1.0");
		menu.show();
		courses.css("margin", "0 0 0 300px");
	
	// Si l'affichage n'est pas très large
	} else {
		menuIcon.show();
		menu.css("opacity", "0.0");
		menu.hide();
		courses.css("margin", "0px");
	
		// Lorsqu'on clique sur le menu
		menuIcon.unbind("click");
		menuIcon.click(function() {
			menu.css("position", "fixed");
			menu.css("top", menuIcon.offset().top - 4);
			displayMenu(menu.is(":hidden"));
		});
		
		// Lorsqu'on clique sur un élément du menu
		menuOption.click(function() {
			displayMenu(false);
		});
	}

	// Si on est en version mobile
	if($(".ui-mobile").length > 0) {
		$("div.ui-select:eq(0)").next().css("font-size", "18px"); //On augmente la taille de "Filtrer par profil :"
	} else {
		// On affiche correctement le filtre par rôle
		var sortSelect = $("select[name='sortOrder']");
		sortSelect.css("display", "inline");
		sortSelect.css("margin-bottom", "0px");
		var topSortSelect = sortSelect.position().top;
		var topFilterSpan = sortSelect.next().position().top;
		var topFilterSelect = sortSelect.next().next().position().top;
		if(Math.abs(topFilterSpan - topFilterSelect) > 5) {
			sortSelect.show();
		}
		if(Math.abs(topSortSelect - topFilterSelect) > 5) {
			sortSelect.css("margin-bottom", "10px");					
		}
	}
	
	// Lorsqu'on clique sur "Afficher les enseignants"
	if(!isResized) addTeachersEvent();
}

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

/**
 * Affiche "Afficher le résumé" selon la taille du module
 */
function configSummary() {
	var summary = $("#tabs-1 div.summary_reply.fold_reply");
	if($(window).width() >= 760) {
		summary.hide();
		summary.next().show();
	} else {
		summary.show();
		summary.next().hide();
	}
	addSummaryEvent();
}

/**
 * Lorsqu'on clique sur "Afficher le résumé"
 */
function addSummaryEvent() {
	addEvent($("#tabs-1 div.summary_reply.fold_reply"));
}

/**
 * Lorsqu'on clique sur "Afficher les enseignants"
 */
function addTeachersEvent() {
	addEvent($("#tabs-1 .teachers_reply.fold_reply"));
}

function addEvent(tag) {
	tag.unbind("click");
	tag.click(function(e) {
		var tagShow = $(e.currentTarget).find(".block-hider-show");
		var tagHide = $(e.currentTarget).find(".block-hider-hide");
		var tagFolded = $(e.currentTarget).next();
		
		if(tagShow.is(":visible")) {
			tagShow.hide();
			tagHide.show();
			tagFolded.show();			
		} else {
			tagShow.show();
			tagHide.hide();
			tagFolded.hide();
		}
	});
}