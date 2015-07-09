<?php
defined('MOODLE_INTERNAL') || die();
 
function xmldb_enrol_self_upgrade($oldversion) {
    global $CFG, $DB, $OUTPUT;
 
    $dbman = $DB->get_manager();
 
    // Moodle v2.2.0 release upgrade line
    // Put any upgrade step following this
 
    if ($oldversion < 2013050101) {
        upgrade_plugin_savepoint(true, 2013050101, 'enrol', 'self');
    }
 
    return true;
}
