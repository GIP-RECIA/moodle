<?php

require_once($CFG->dirroot.'/user/filters/lib.php');

if (!defined('MAX_BULK_USERS')) {
    define('MAX_BULK_USERS', 2000);
}

function add_selection_all($ufiltering) {
    global $SESSION, $DB, $CFG;

    list($sqlwhere, $params) = $ufiltering->get_sql_filter("id<>:exguest AND deleted <> 1", array('exguest'=>$CFG->siteguest));

    $rs = $DB->get_recordset_select('user', $sqlwhere, $params, 'fullname', 'id,'.$DB->sql_fullname().' AS fullname');
    foreach ($rs as $user) {
        if (!isset($SESSION->bulk_users[$user->id])) {
            $SESSION->bulk_users[$user->id] = $user->id;
        }
    }
    $rs->close();
}

function get_selection_data($ufiltering) {
    /**
     * Modification Pierre LEJEUNE, GIP Récia afin d'intégrer le champ établissement dans l'affichage
     */
    global $SESSION, $DB, $CFG, $USER;

    $base_sql_where = "u.id<>:exguest AND u.deleted <> 1";
    $base_sql_parameters =  array('exguest'=>$CFG->siteguest);

    $from = array("{user} u");

    if(!empty($USER->profile["etablissement"])){
        $base_sql_where = "uif.shortname = 'etablissement' AND uid.data = :etablissement AND " . $base_sql_where;
        $base_sql_parameters["etablissement"] = $USER->profile["etablissement"];
        $from[] = "{user_info_data} uid ON u.id = uid.userid";
        $from[] = "{user_info_field} uif ON uif.id = uid.fieldid";
    }

    // get the SQL filter
    list($sqlwhere, $params) = $ufiltering->get_sql_filter($base_sql_where,$base_sql_parameters);
    $sqlwhere = str_replace("AND id IN", "AND u.id IN", $sqlwhere);

    $from = implode(" LEFT JOIN ", $from);
    $order_by = "fullname ASC";

    $total = $DB->count_records_sql("SELECT COUNT(DISTINCT u.id) FROM $from WHERE $base_sql_where", $base_sql_parameters);
    $acount = $DB->count_records_sql("SELECT COUNT(DISTINCT u.id) FROM $from WHERE $sqlwhere", $params);

    $scount = count($SESSION->bulk_users);

    $userlist = array('acount'=>$acount, 'scount'=>$scount, 'ausers'=>false, 'susers'=>false, 'total'=>$total);

    $sql = "SELECT u.id," . $DB->sql_fullname("u.firstname","u.lastname") ." AS fullname FROM $from WHERE $sqlwhere ORDER BY $order_by";
    $records = $DB->get_records_sql($sql, $params, 0, MAX_BULK_USERS);

    // Conversion stdClass en tableau
    $menu = array();
    foreach ($records as $record) {
        $record = (array)$record;
        $key   = array_shift($record);
        $value = array_shift($record);
        $menu[$key] = $value;
    }
    $userlist['ausers'] = $menu;

    if ($scount) {
        if ($scount < MAX_BULK_USERS) {
            $bulkusers = $SESSION->bulk_users;
        } else {
            $bulkusers = array_slice($SESSION->bulk_users, 0, MAX_BULK_USERS, true);
        }
        list($in, $inparams) = $DB->get_in_or_equal($bulkusers);
        $userlist['susers'] = $DB->get_records_select_menu('user', "id $in", $inparams, 'fullname', 'id,'.$DB->sql_fullname().' AS fullname');
    }

    return $userlist;
}
