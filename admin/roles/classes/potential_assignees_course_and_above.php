<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Library code used by the roles administration interfaces.
 *
 * @package    core_role
 * @copyright  1999 onwards Martin Dougiamas (http://dougiamas.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * User selector subclass for the list of potential users on the assign roles page,
 * when we are assigning in a context at or above the course level. In this case we
 * show all the users in the system who do not already have the role.
 */
class core_role_potential_assignees_course_and_above extends core_role_assign_user_selector_base {
    public function find_users($search) {
        global $DB, $USER;

        list($wherecondition, $params) = $this->search_sql($search, 'u');

        $fields      = 'SELECT ' . $this->required_fields_sql('u');
        $countfields = 'SELECT COUNT(1)';

        /**
         * Modification Pierre LEJEUNE, GIP Récia afin d'intégrer le champ établissement dans le filtre
         */
        $from = array("{user} u");
        $from[] = "{user_info_data} uid ON u.id = uid.userid";
        $from[] = "{user_info_field} uif ON uif.id = uid.fieldid";

        if(!empty($USER->profile["etablissement"])){
            $wherecondition = sprintf("uif.shortname = 'etablissement' AND uid.data = '%s' AND %s", $USER->profile["etablissement"], $wherecondition);
        }

        $sql = " FROM " . implode(" LEFT JOIN ", $from) . " WHERE $wherecondition
                      AND u.id NOT IN (
                         SELECT r.userid
                           FROM {role_assignments} r
                          WHERE r.contextid = :contextid
                                AND r.roleid = :roleid)";

        list($sort, $sortparams) = users_order_by_sql('', $search, $this->accesscontext);
        $order = ' ORDER BY ' . $sort;

        $params['contextid'] = $this->context->id;
        $params['roleid'] = $this->roleid;

        if (!$this->is_validating()) {
            $potentialmemberscount = $DB->count_records_sql($countfields . $sql, $params);
            if ($potentialmemberscount > $this->maxusersperpage) {
                return $this->too_many_results($search, $potentialmemberscount);
            }
        }

        $availableusers = $DB->get_records_sql($fields . $sql . $order, array_merge($params, $sortparams));

        if (empty($availableusers)) {
            return array();
        }

        if ($search) {
            $groupname = get_string('potusersmatching', 'core_role', $search);
        } else {
            $groupname = get_string('potusers', 'core_role');
        }

        return array($groupname => $availableusers);
    }
}
