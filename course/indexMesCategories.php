<?php

require_once("../config.php");
require_once("lib.php");
require_once("../lib/ent.php");

$site = get_site();

$systemcontext = get_context_instance(CONTEXT_SYSTEM);

$PAGE->set_url('/course/indexMesCategories.php');
$PAGE->set_context($systemcontext);
$PAGE->set_pagelayout('admin');

$strmycourses = get_string('mycourses');
$strfulllistofcourses = get_string('fulllistofcourses');
$strcategories = get_string('categories');
$countcategories = $DB->count_records('course_categories');

if ($countcategories > 1 || ($countcategories == 1 && $DB->count_records('course') > 200)) {
	
	$PAGE->navbar->add($strcategories);
	$PAGE->set_title("$site->shortname: $strcategories");
	$PAGE->set_heading($strcategories);
	$PAGE->set_button(update_category_button());
	echo $OUTPUT->header();
	
	echo $OUTPUT->heading($strcategories);
	
	echo '<div style="text-align:center;">';
	echo $OUTPUT->action_link("./index.php",$strfulllistofcourses);
	echo " - ";
	echo $OUTPUT->action_link("./indexMesCours.php",$strmycourses);
	echo '</div>';
	echo $OUTPUT->skip_link_target();
	echo $OUTPUT->box_start('categorybox');
	print_my_category_list();
	echo $OUTPUT->box_end();
	print_course_search();
}
echo $OUTPUT->container_start('buttons');
if (has_capability('moodle/course:create', $systemcontext)) {
	$options = array('category' => $CFG->defaultrequestcategory);
	echo $OUTPUT->single_button(new moodle_url('edit.php', $options), get_string('addnewcourse'), 'get');
}
echo $OUTPUT->container_end();
echo $OUTPUT->footer();
?>