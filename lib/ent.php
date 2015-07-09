<?php 


/**
* Fonction permettant de comparer des categories sur leurs noms
* pour les trier.
*/
function cmp_categories($first_category, $second_category) {
    return strcmp($first_category->name, $second_category->name);
}

function enrol_get_my_courses_assignements($userid,$filter=""){
	    global $DB;
	    $params['userid']   = $userid;
	    $sql = "Select course.*
				    from mdl_role_assignments role 
				    join mdl_context c on c.id = role.contextid 
				    join mdl_course course on course.id = c.instanceid  
				    where userid = :userid ".$filter.";";
	    $courses = $DB->get_records_sql($sql, $params);
	    return $courses;
    }
    
    
    /*
    Fonction qui imprime la liste des cours et des catégories auxquel l'utilisateur à acces
    */
    function print_my_course_list() {
    
    	//Construction de la liste des cours.
    	global $USER;
    	$ids = enrol_get_my_courses('id');
    	$listeCourses = enrol_get_my_courses_assignements($USER->id);
    	foreach($listeCourses as $c){
    		array_push($ids, $c->id);
    	}
    
    	//On recuppere tous les catégories de niveau sup
    	$categories = get_child_categories(0);
        usort($categories, "cmp_categories");
    	if ($categories) {
		$resultat = '';
    		foreach ($categories as $cat) {
    			if (has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT, $cat->id))){
    				$resultat .= get_my_course_list_rec($cat,$ids,true);
    			} else {
    				$resultat .= get_my_course_list_rec($cat,$ids);
    			}
    		}
		echo html_writer::tag('table', $resultat, array( ));
    	}
    }
    
    /*
    Fonction recursive qui affiche la liste des cours et des catégories auxquel l'utilisateur à acces
    */
    function get_my_course_list_rec($categorie,$ids,$filsDeOk=false,$depth=0) {
    	global $USER;
    	$resultat = '';
    
    	$courses = get_courses($categorie->id);
    	if ($courses){
    		foreach($courses as $course){
    			/*if (can_access_course($course)){
    				$resultat .= get_course_to_print($course,$depth,$categorie);
    			}*/
    	
    			if (in_array($course->id,$ids)){
    				$resultat .= get_course_to_print($course,$depth,$categorie);
    			}
    		}
    	}
    	//On recuppere tous les catégories fils
    	$categories = get_child_categories($categorie->id);
    	if ($categories) {
    		foreach ($categories as $cat) {
    			if ($filsDeOk || has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT, $cat->id))) {
    				$resultat .= get_my_course_list_rec($cat,$ids,true,$depth+1);
    			}
    			//Soit on doit verifier dans les fils si on doit afficher
    			else {
    				$resultat .= get_my_course_list_rec($cat,$ids,false,$depth+1);
    			}
    		}
    	}
    
    	if ( ($filsDeOk || $resultat != '') and ($depth <= 1)){
    		$resultat = get_category_info_debut($categorie, $depth, true).$resultat.get_category_info_fin();
    	}
   
    	return $resultat;
    }
    
    function get_category_info_debut($category, $depth, $showaslink) {
    	global $CFG, $DB, $OUTPUT;
    
    	$catlinkcss = null;
    	if (!$category->visible) {
    		$catlinkcss = array('class'=>'dimmed');
    	}
    
    	$catimage = '<img src="'.$OUTPUT->pix_url('i/course') . '" alt="" />';
    
    	$context = get_context_instance(CONTEXT_COURSECAT, $category->id);
    	$fullname = format_string($category->name, true, array('context' => $context));
    
    	$cat =  '<div class="categorylist clearfix">';
    
    	$html = '';
    	$catlink = html_writer::link(new moodle_url('/course/category.php', array('id'=>$category->id)), $fullname, $catlinkcss);
    	$cat .= html_writer::tag('td', $catimage . '&nbsp;' . $catlink, array('class'=>'name', 'colspan' => '2', 'width' => '300px'));

	if($depth > 0) {
    		for ($i=0; $i < $depth; $i++) {
    			$cat = html_writer::tag('td', '', array( 'width' => '15px' )) . $cat;
    		}
	}
    
    	$html .= html_writer::tag('tr', $cat, array('class'=>'category'));
    
    	$html .= html_writer::tag('tr', '', array('class'=>'clearfloat'));
    
    
    	return $html;
    }
    function get_category_info_fin() {
    	return '</div>';
    }
    
    function get_course_to_print($course,$depth,$category){
    	global $CFG,$OUTPUT;
    
    	static $strallowguests, $strrequireskey, $strsummary;
    	if (empty($strsummary)) {
    		$strallowguests = get_string('allowguests');
    		$strrequireskey = get_string('requireskey');
    		$strsummary = get_string('summary');
    	}
    
    	$res = '';
    	$linkcss = null;
    
    	if (!$course->visible) {
    		$linkcss = array('class'=>'dimmed');
    	}
    
    	$coursename = get_course_display_name_for_list($course);
    	$courselink = html_writer::link(new moodle_url('/course/view.php', array('id'=>$course->id)), format_string($coursename), $linkcss);
    
    	$courseicon = '';
    	if ($icons = enrol_get_course_info_icons($course)) {
    		foreach ($icons as $pix_icon) {
    			$courseicon = $OUTPUT->render($pix_icon).' ';
    		}
    	}
    
    
	$actionlink = '';
    	if ($course->summary) {
    		$link = new moodle_url('/course/info.php?id='.$course->id);
    		$actionlink = $OUTPUT->action_link($link, '<img alt="'.$strsummary.'" src="'.$OUTPUT->pix_url('i/info') . '" />',
    				new popup_action('click', $link, 'courseinfo', array('height' => 400, 'width' => 500)),
    				array('title'=>$strsummary));
    	}
    	$coursecontent = html_writer::tag('td', $courseicon . $courselink . $actionlink, array('class'=>'name'));
    	
    	if($depth + 1 > 0){
    		for ($i=0; $i < $depth + 1; $i++) {
    			$coursecontent = html_writer::tag('td', '' , array( )) . $coursecontent;
    		}
   	}
 
    	$html = html_writer::tag('tr', $coursecontent, array('class'=>'course clearfloat'));
    
    
    	return $html;
    }
    
    
    /*
    Fonction qui imprime la liste des catégories de niveau superieure où il est possible de voir ou créer un cours.
    */
    function print_my_category_list() {
    	global $USER;
    	$ids = enrol_get_my_courses('id');
    	$listeCourses = enrol_get_my_courses_assignements($USER->id);
    	foreach($listeCourses as $c){
    		array_push($ids, $c->id);
    	}
    
    	//On recuppere tous les catégories de niveau sup
    	$categories = get_child_categories(0);
        usort($categories, "cmp_categories");
    	if ($categories) {
    		foreach ($categories as $cat) {
    			//Soit on a la capacité de créer dans cette catégorie - c'est gagné
    			if (has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT, $cat->id))) {
    				echo get_category_info($cat, 0, true);
    			}
    			//Soit on doit verifier dans les fils si on doit afficher
    			else {
    				if (is_category_to_print($cat, $ids)) {
    					echo get_category_info($cat, 0, true);
    				}
    			}
    		}
    	}
    }
    
    function get_category_info($category, $depth, $showaslink) {
    	return get_category_info_debut($category, $depth, $showaslink).get_category_info_fin();
    }
    /*
    Fonction recursive qui permet de savoir s'il faut affiche une catégorie dans le cadre de l'affichage de toutes les catégories d'un utilisateur
    */
    function is_category_to_print($categorie, $ids) {
    	$courses = get_courses($categorie->id);
    	if ($courses){
    		foreach($courses as $course){
    			if (in_array($course->id,$ids)){
    				return true;
    			}
    		}
    	}
    	//On recuppere tous les catégories fils
    	$categories = get_child_categories($categorie->id);
    	if ($categories) {
    		foreach ($categories as $cat) {
    			//Soit on a la capacité de créer dans cette catégorie - c'est gagné
    			if (has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT, $cat->id))) {
    				return true;
    			}
    			//Soit on doit verifier dans les fils si on doit afficher
    			else {
    				if (is_category_to_print($cat, $ids)) {
    					return true;
    				}
    			}
    		}
    	}
    	return false;
    }
    
?>
