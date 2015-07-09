<?php

function get_first_categorie_to_create(){
   $categories = get_all_subcategories(0);
	        
   foreach ($categories as $categoryId) {
        if (has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT,$categoryId))){
		   if($categoryId != 1) {
		      return $categoryId;
		   } else {
		      $categoryInterId = $categoryId;
		   }
	    }   
    }           
	return $categoryInterId;
}   

function myplugin_extends_navigation(global_navigation $navigation) {

/* Suppression du lien vers l'item "Accueil du site" du bloc navigation : */
	if ($home = $navigation->find('home', global_navigation::TYPE_SETTING)) {
	        $home->remove();
	}
/* Faire en sorte que le lien "Cours actuel" soit fermé à l'arrivée sur un cours Moodle, afin d'alléger l'affichage du bloc "Navigation" */
        if ($currentcourse = $navigation->find('currentcourse', global_navigation::TYPE_ROOTNODE)) {
                $currentcourse->forceopen = false;
        }

	if(user_can_create_courses()){
	$idCategorie = 1;
	$idCategorie = get_first_categorie_to_create();

	$nodeAction = $navigation->add(get_string('Actions', 'local_myplugin'));
	$nodeCreateCourse = $nodeAction->add(get_string('Create_course', 'local_myplugin'), new moodle_url('/course/edit.php', array('category'=>$idCategorie)));
	/*	ATTENTION, 'view'=>'courses' pas fonctionnel car le changement de page ramène à la vue catégorie... De plus il faut mettre en premier les cours ou l'in est prof ou propriétaire... 
	$nodeManageCourse = $nodeAction->add(get_string('Manage_courses'), new moodle_url('/course/management.php', array('categoryid'=>$idCategorie,'view'=>'courses'))); */
	$nodeManageCourse = $nodeAction->add(get_string('Manage_courses', 'local_myplugin'), new moodle_url('/course/management.php', array('categoryid'=>$idCategorie)));
	$nodeAction->force_open();
	}
}
?>
