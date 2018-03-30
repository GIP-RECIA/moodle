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
     * Adaptation pour Moodle 4.1
     */
    global $SESSION, $DB, $CFG, $USER;

    // Préparation des conditions de base et des tables
    $base_sql_where = "u.id <> :exguest AND u.deleted <> 1";
    $base_sql_parameters = ['exguest' => $CFG->siteguest];

    // Table principale et jointures
    $tables = ['{user} u'];
    
    // Ajout du filtre par établissement si l'utilisateur courant a un établissement défini
    if (!empty($USER->profile["etablissement"])) {
        // Ajout des jointures pour les tables de profil utilisateur
        $tables[] = '{user_info_data} uid ON u.id = uid.userid';
        $tables[] = '{user_info_field} uif ON uif.id = uid.fieldid AND uif.shortname = :fieldname';
        
        // Ajout de la condition sur l'établissement
        $base_sql_where .= " AND uid.data = :fieldvalue";
        
        // Ajout des paramètres pour l'établissement
        $base_sql_parameters['fieldname'] = 'etablissement';
        $base_sql_parameters['fieldvalue'] = $USER->profile["etablissement"];
    }

    // Obtention du filtre SQL à partir de l'objet de filtrage
    list($sqlwhere, $params) = $ufiltering->get_sql_filter($base_sql_where, $base_sql_parameters);
    
    // Assurez-vous que toutes les références à 'id' dans les clauses IN sont correctement préfixées
    // Utilisation d'une regex pour gérer les variations d'espacement
    $sqlwhere = preg_replace('/(AND\s+)id(\s+IN)/i', '$1u.id$2', $sqlwhere);

    // Construction de la clause FROM avec les jointures
    $from = implode(" LEFT JOIN ", $tables);
    $order_by = "fullname ASC";

    // Comptage des utilisateurs
    $total = $DB->count_records_sql("SELECT COUNT(DISTINCT u.id) FROM $from WHERE $base_sql_where", $base_sql_parameters);
    $acount = $DB->count_records_sql("SELECT COUNT(DISTINCT u.id) FROM $from WHERE $sqlwhere", $params);
    
    $scount = count($SESSION->bulk_users);

    // Initialisation du tableau de résultats
    $userlist = [
        'acount' => $acount,
        'scount' => $scount, 
        'ausers' => false, 
        'susers' => false, 
        'total' => $total
    ];

    // Sélection des utilisateurs avec limite
    $sql = "SELECT u.id, " . $DB->sql_fullname("u.firstname", "u.lastname") . " AS fullname 
            FROM $from 
            WHERE $sqlwhere 
            ORDER BY $order_by";
    $records = $DB->get_records_sql($sql, $params, 0, MAX_BULK_USERS);

    // Conversion des objets en tableau associatif pour l'interface utilisateur
    $menu = [];
    foreach ($records as $record) {
        $menu[$record->id] = $record->fullname;
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
