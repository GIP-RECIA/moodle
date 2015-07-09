<?php
require_once($CFG->dirroot.'/lib/weblib.php');
require_once($CFG->dirroot . '/lib/formslib.php');
require_once($CFG->dirroot . '/lib/ent.php');

class block_mycourse extends block_base {
	/**
	* block initializations
	*/
	public function init() {
		$this->title   = get_string('pluginname', 'block_mycourse');
	}
	
	function specialization() {
		// At this point, $this->instance and $this->config are available
		// for use. We can now change the title to whatever we want.
		$this->title = "Mes Cours";
	}
	
	public function get_content() {
		global $USER, $CFG,$DB,$OUTPUT;

		if ($this->content !== null) {
			return $this->content;
		}
	
		$this->content         =  new stdClass;
		$this->content->text   = '';
		$this->content->footer = '';
		
		
		$content = array();
		
		$courses_limit = 21;
		// FIXME: this should be a block setting, rather than a global setting
		if (isset($CFG->mycoursesperpage)) {
			$courses_limit = $CFG->mycoursesperpage;
		}
		
		$morecourses = false;
		if ($courses_limit > 0) {
			$courses_limit = $courses_limit + 1;
		}
		
		//on recupere les infos de la table user_enrolments
		$courses = enrol_get_my_courses('id, shortname, modinfo', 'visible DESC,sortorder ASC', $courses_limit);
		
		$site = get_site();
		$course = $site;
		
		$strfulllistofcourses = get_string('fulllistofcourses');
		$strmycourses = get_string('mycourses');
		$sql = '';
		$listeCours = array();
		foreach ($courses as $c) {
			if (isset($USER->lastcourseaccess[$c->id])) {
				$courses[$c->id]->lastaccess = $USER->lastcourseaccess[$c->id];
			} else {
				$courses[$c->id]->lastaccess = 0;
			}
			
			$sql .= " AND ".$c->id." <> course.id"; 
			$context = get_context_instance(CONTEXT_COURSE,$c->id);
			if($DB->record_exists('role_assignments', array('userid' => $USER->id,'contextid' => $context->id ),null)){
				array_push($listeCours,$c);
			}
		}
		$sql .= " and (roleid = '3' or roleid = '5')";
		$listeCourses = enrol_get_my_courses_assignements($USER->id,$sql);
		foreach($listeCourses as $c){
			array_push($listeCours,$c);
		}
		
		if(user_can_create_courses()){
			$idCategorie = 1;
			$idCategorie = $this->get_first_categorie_to_create();
			$content[] = $OUTPUT->pix_icon('i/item', get_string("coursecategory"));
			$content[] = html_writer::link(new moodle_url('/course/edit.php', array('category'=>$idCategorie)), "Créer un cours", null);
			$content[] = '<br/>';
			$content[] = $OUTPUT->pix_icon('i/item', get_string("coursecategory"));
			$content[] = html_writer::link(new moodle_url('/course/manage.php', array('categoryid'=>$idCategorie)), "Gérer mes cours", null);
			$content[] = '<br/>'; 
		}
		if (empty($listeCours)) {
			$content[] = "Vous n'êtes inscrit à aucun cours";
			$link = new moodle_url("/course/index.php");
			$footer = $OUTPUT->action_link($link,$strfulllistofcourses);
		} else {
			ob_start();
		
			require_once $CFG->dirroot."/course/lib.php";
			
			$link = new moodle_url("/course/indexMesCours.php");
			$footer =  $OUTPUT->action_link($link,$strmycourses);
			
			foreach($listeCours as $course){
				$linkcss = $course->visible ? "" : " class=\"dimmed\" ";
				
				$linkcss = null;
				if (!$course->visible) {
					$linkcss = array('class'=>'dimmed');
				}

				$coursename = get_course_display_name_for_list($course);
				$courselink = html_writer::link(new moodle_url('/course/view.php', array('id'=>$course->id)), format_string($coursename), $linkcss);
				
				$content[] = $OUTPUT->pix_icon('c/course', get_string("coursecategory"));
				$content[] = $courselink;
				$content[] = '<br/>';
			}
			
			$content[] = ob_get_contents();
			ob_end_clean();
		}
		
		$this->content->footer = $footer;
		$this->content->text = implode($content);
		
		return $this->content;
	}
	
	/**
	* allow more than one instance of the block on a page
	*
	* @return boolean
	*/
	public function instance_allow_multiple() {
		//allow more than one instance on a page
		return false;
	}
	
	/**
	* allow the block to have a configuration page
	*
	* @return boolean
	*/
	public function has_config() {
		return false;
	}
	
	
	/**
	* locations where block can be displayed
	*
	* @return array
	*/
	public function applicable_formats() {
		return array('my-index'=>true);
	}
	
	function get_first_categorie_to_create(){
		$categories = get_all_subcategories(0);
	
		foreach ($categories as $categoryId) {
			if (has_capability('moodle/course:create', get_context_instance(CONTEXT_COURSECAT,$categoryId))){
				////////////////////////////////////////////////
				// MODIFICATION RECIA | DEBUT | 2013-07-09
				////////////////////////////////////////////////
				// Ancien code :
				// return $categoryId;

				// Nouveau code :
				if($categoryId != 1) {
					return $categoryId;
                } else {
                    $categoryInterId = $categoryId;
                }
            }
        }
        return $categoryInterId;
				////////////////////////////////////////////////
				// MODIFICATION RECIA | FIN
				////////////////////////////////////////////////	
	}
	
    
	
}
?>	
