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
 * Jmol filter.
 *
 * @package    filter
 * @subpackage jmol
 * @copyright  2006 Dan Stowell
 * @copyright  2007-2008 Szymon Kalasz Internationalisation strings added as part of GHOP
 * @url        http://moodle.org/mod/forum/discuss.php?d=88201
 * @copyright  20011 Geoffrey Rowland <growland at strode-college dot ac dot uk> Updated for Moodle 2
 * @copyright  20013 Geoffrey Rowland <growland at strode-college dot ac dot uk> Updated to use JSmol
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// Jmol/JSmol plugin filtering for viewing molecules online
//
// This filter will replace any links to a .mol, .sdf, .csmol, .pdb,
// .pdb.gz .xyz, .cml, .mol2, or .cif file
// with the JavaScript (and associated technologies) needed to display the molecular structure inline
//
// If required, allows customisation of the Jmol applet size (default 350 px)
//
// Similarly, allows selection of a few different Jmol control sets depending on the chemical context
// e.g. small molecule, biological macromolecule, crystal
//
// Also, customisation of the initial display though Jmol scripting
//
// To activate this filter, go to admin and enable 'jmol'.
//
// Latest JSmol version is available from http://chemapps.stolaf.edu/jmol/jsmol.zip
// Unzipped jsmol folder (and contents) can be used to replace/update the jsmol folder in this bundle
// Jmol project site: http://jmol.sourceforge.net/
// Jmol interactive scripting documentation(Use with JMOLSCRIPT{ }): http://chemapps.stolaf.edu/jmol/docs/
// Jmol Wiki: http//wiki.jmol.org.

class filter_jmol extends moodle_text_filter {

    public function filter($text, array $options = array()) {
        // Global declared in case YUI JSmol module is inserted elsewhere in page (e.g. JSmol resource artefact?).
        global $CFG, $yui_jsmol_has_been_configured;
        $wwwroot = $CFG->wwwroot;
        $host = preg_replace('~^.*://([^:/]*).*$~', '$1', $wwwroot);

        // Edit $jmolfiletypes to add/remove chemical structure file types that can be displayed.
        // For more detail see: http://wiki.jmol.org/index.php/File_formats.
        $jmolfiletypes ='cif|cml|csmol|mol|mol2|pdb\.gz|pdb|pse|sdf|xyz';

        // Modification Recia - chemin relatif des fichiers
        //$search = '/<a\\b([^>]*?)href=\"((?:\.|\\\|https?:\/\/' . $host . ')[^\"]+\.('.$jmolfiletypes.'))\??(.*?)\"([^>]*)>(.*?)<\/a>(\s*JMOLSCRIPT\{(.*?)\})?/is';
        $search = '/<a\\b([^>]*?)href=\"((?:\.|\\\|https?:\/\/'.$_SERVER["HTTP_X_FORWARDED_HOST"].')[^\"]+\.('.$jmolfiletypes.'))\??(.*?)\"([^>]*)>(.*?)<\/a>(\s*JMOLSCRIPT\{(.*?)\})?/is';
        // Fin modification Recia

        $newtext = preg_replace_callback($search, 'filter_jmol_replace_callback', $text);
        // YUI JSmol module configured once per page.
        if (($newtext != $text) && !isset($yui_jsmol_has_been_configured)) {
            $yui_jsmol_has_been_configured = true;
            $newtext = "<script type='text/javascript'>
            YUI().applyConfig({
                modules: {
                    'jsmol': {
                        fullpath: M.cfg.wwwroot + '/filter/jmol/yui/jsmol/JSmol.min.js'
                    }
                }
            });
            </script>".$newtext;
        }
        return $newtext;
    }
}

function filter_jmol_replace_callback($matches) {
    global $CFG;
    $wwwroot = $CFG->wwwroot;
    static $count = 0;
    $count++;
    $id = time() . $count;

    // JSmol size (width = height) in pixels defined by parameter appended to structure file URL e.g. ?s=200, ?s=300 (default) etc.
    if (preg_match('/s=(\d{1,3})/', $matches[4], $optmatch)) {
        $size = $optmatch[1];
    } else {
        $size = 300;
    }
    if (!preg_match('/c=(\d{1,2})/', $matches[4], $optmatch)) {
        $optmatch = array(1 => 1);
    }
    // Get language strings.
    $style = get_string('style', 'filter_jmol');
    $wireframe = get_string('wireframe', 'filter_jmol');
    $stick = get_string('stick', 'filter_jmol');
    $ballandstick = get_string('ballandstick', 'filter_jmol');
    $spacefill = get_string('spacefill', 'filter_jmol');
    $unitcell = get_string('unitcell', 'filter_jmol');
    $polyhedra = get_string('polyhedra', 'filter_jmol');
    $hydrogens = get_string('hydrogens', 'filter_jmol');
    $backbone = get_string('backbone', 'filter_jmol');
    $cartoon = get_string('cartoon', 'filter_jmol');
    $spin = get_string('spin', 'filter_jmol');
    $jmolhelp = get_string('jmolhelp', 'filter_jmol');
    $jsdisabled = get_string('jsdisabled', 'filter_jmol');
    $downloadstructurefile = get_string('downloadstructurefile', 'filter_jmol');
    
    // File path = $matches[2]
    // File extension = $matches[3]
    // Controls defined by parameter appended to structure file URL ?c=0, ?c=1 (default), ?c=2 ,?c=3 or ?c=4.
	// Modification Recia - modifications de Michel Gillet
	/* 
    switch($optmatch[1]) {
        // No controls at all.
        case 0:
            $control = '';
            break;
        // Controls for crystallography e.g. cif files): Atom display, Unit cell and Spin.
        case 2:
            $control = 'Jmol.jmolMenu(jmol'.$id.', [
            ["#optgroup", "'.$style.'"],
            ["wireframe only", "'.$wireframe.'"],
            ["spacefill off; wireframe 0.15", "'.$stick.'"], ["wireframe 0.15; spacefill 23%", "'.$ballandstick.'", "selected"],
            ["spacefill on", "'.$spacefill.'"], ["#optgroupEnd"]
            ])+
            Jmol.jmolCheckbox(jmol'.$id.', "set unitcell on; set axes on", "set unitcell off; set axes off", "'.$unitcell.'", "")+
            Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", "'.$spin.'", "")';
            break;
        // Default controls for biological macromolecules e.g. pdb files: Display and Spin.
        case 3:
            $control = 'Jmol.jmolMenu(jmol'.$id.', [
            ["#optgroup", "'.$style.'"],
            ["cartoons off; backbone off; wireframe only", "'.$wireframe.'"],
            ["cartoons off; backbone off; spacefill off; wireframe 0.15", "'.$stick.'"],
            ["cartoons off; backbone off; wireframe 0.15; spacefill 23%", "'.$ballandstick.'", "selected"],
            ["cartoons off; backbone off; spacefill on", "'.$spacefill.'"],
            ["spacefill off; cartoons off; wireframe off; backbone 0.5; color backbone group", "'.$backbone.'"],
            ["spacefill off; backbone off; wireframe off; cartoons on; color cartoons structure", "'.$cartoon.'"],
            ["#optgroupEnd"]
            ])+
            Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", "'.$spin.'", "")';
             break;
        // Default controls for small molecules e.g. mol files: Atom display and Spin.
        default:
            $control = 'Jmol.jmolMenu(jmol'.$id.', [
            ["#optgroup", "'.$style.'"],
            ["wireframe only", "'.$wireframe.'"],
            ["spacefill off; wireframe 0.15","'.$stick.'"],
            ["wireframe 0.15; spacefill 23%", "'.$ballandstick.'", "selected"],
            ["spacefill on", "'.$spacefill.'"], ["#optgroupEnd"]
            ])+
            Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", "Spin", "")';
    } // End of switch */
    switch($optmatch[1]) {
        // No controls at all.
        case 0:
            $control = '';
            break;
        // Controls for crystallography e.g. cif files): Atom display, Unit cell and Spin.
        case 2: //copie de default
			$control = 'Jmol.jmolMenu(jmol'.$id.', [
            ["#optgroup", "'.$style.'"],	
			["backbone off; ribbons off; trace off; cartoons off; strands off; meshribbon off; rockets off; set hbonds sidechain; spacefill 25%;  wireframe 0.25;", "&eacute;clat&eacute;", true],
            ["wireframe 0.25; trace off; spacefill off", "b&acirc;tonnets"],
            ["spacefill; trace off; wireframe off", "compact"],
            ["spacefill off; wireframe off; trace structure", "trace structure"], ["#optgroupEnd"]
            ])+
			Jmol.jmolHtml("&nbsp;&nbsp;")+
			Jmol.jmolCheckbox(jmol'.$id.', "background black", "background white", " fond (N/B)","")+
			Jmol.jmolBr()+
            Jmol.jmolCheckbox(jmol'.$id.', "select all; hbonds calculate; hbonds 0.3; set hbonds backbone; color hbonds white", "hbonds off", " liaisons H","")+
            Jmol.jmolHtml("&nbsp;&nbsp;")+
            Jmol.jmolCheckbox(jmol'.$id.', "select all; ssbonds 0.4; set ssbonds backbone; color ssbonds yellow", "ssbonds off", " liaisons S-S","")+
            Jmol.jmolHtml("&nbsp;&nbsp;")+
            Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", " rotation auto","")+
            Jmol.jmolBr()+
            Jmol.jmolMenu(jmol'.$id.', [
				["#optgroup", "'.$style.'"],
				["select all; color cpk", "Couleurs des atomes", true], 
                ["color amino", "Couleurs par acides amin&eacute;s "],
                ["color bisque; select :a; color bisque; select :c; color burlywood; select :b; color peru; select :d; color sienna; select all", "Couleurs par chaines"],
                ["color structure", "Couleurs par structures (h&eacute;lices...)"], ["#optgroupEnd"]
            ])';
			 break;
          
        // Default controls for biological macromolecules e.g. pdb files: Display and Spin.
        case 3:
			$control = 'Jmol.jmolHtml("S&eacute;lection :&nbsp;")+
			Jmol.jmolMenu(jmol'.$id.', [
				["#optgroup", "'.$style.'"],
				["select all", "tout", true],
                ["select :a", "chaine A"],
                ["select :b", "chaine B"],
                ["select a", "nucl&eacute;otides &agrave; ad&eacute;nine"],
                ["select c", "nucl&eacute;otides &agrave; cytosine"],
                ["select g", "nucl&eacute;otides &agrave; guanine"],
                ["select t", "nucl&eacute;otides &agrave; thymine"],
                ["select u", "nucl&eacute;otides &agrave; uracile"], ["#optgroupEnd"]])+
            Jmol.jmolBr()+
            Jmol.jmolHtml("Affichage :&nbsp;")+
			Jmol.jmolMenu(jmol'.$id.', [
				["#optgroup", "'.$style.'"],
				["backbone off; ribbons off; trace off; cartoons off; strands off; meshribbon off; rockets off; set hbonds sidechain; spacefill 25%;  wireframe 0.25;", "&eacute;clat&eacute;", true],
                ["wireframe 0.25; trace off; spacefill off", "b&acirc;tonnets"],
                ["spacefill; trace off; wireframe off", "compact"],
                ["trace 120; spacefill off; wireframe off", "trace"],
                ["trace 120; spacefill off; ribbons off; wireframe 0.25", "trace et b&acirc;tons"],
                ["trace 120; spacefill 25%; ribbons off; wireframe 0.25", "trace et &eacute;clat&eacute;"],
                ["wireframe off; backbone off; trace off; cartoons off; strands off; meshribbon off; rockets off; ribbons on; set hbonds backbone;", "ruban"],
                ["spacefill off; wireframe off; trace off", "off"], ["#optgroupEnd"]])+
			Jmol.jmolHtml("&nbsp;")+
			Jmol.jmolMenu(jmol'.$id.', [
				["#optgroup", "'.$style.'"],
				["select all; color cpk", "Couleurs des atomes", true],
                ["select :a; color gold; select :b; color lightsalmon", "Couleurs des cha&icirc;nes"],
                ["select a; color gold; select c; color darkorchid; select g; color limegreen; select t; color dodgerblue", "Couleurs ACGT"],
                ["select a; color gold; select c; color darkorchid; select g; color limegreen; select u; color blue", "Couleurs ACGU"], ["#optgroupEnd"]])+
			Jmol.jmolHtml("&nbsp;")+
			Jmol.jmolCheckbox(jmol'.$id.', "background black", "background white", " fond (N/B)","")+
			Jmol.jmolBr()+
			Jmol.jmolCheckbox(jmol'.$id.', "select all; hbonds calculate; hbonds 0.2; set hbonds backbone; color hbonds white", "hbonds off", " liaisons H","")+
			Jmol.jmolHtml("&nbsp;&nbsp;")+
            Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", " rotation auto","")';
		 break;      
        // Default controls for small molecules e.g. mol files: Atom display and Spin.
        default:
		//**** debut modif mg
			$control = 'Jmol.jmolRadioGroup(jmol'.$id.', [ 
				["spacefill off", "baton"],
                ["spacefill 20%", "&eacute;clat&eacute;", "checked"],
                ["spacefill 100%", "compact"]])+
			Jmol.jmolBr()+	
            Jmol.jmolCheckbox(jmol'.$id.',"dots on", "dots off", " nuage de points ","")+
			Jmol.jmolCheckbox(jmol'.$id.', "background black", "background white", " fond (N/B)","")+
			Jmol.jmolBr()+
			Jmol.jmolCheckbox(jmol'.$id.', "spin on", "spin off", " rotation auto ", "")';			
    } // End of switch
	// Fin modification Recia
    //
    // Prepare divs for JSmol and controls.
    // Load JSmol JavaScript as a YUI module.
    // The Y.on('load', function () {} is important in ensuring that JSmol does not interfere with Moodle YUI functions.
    // Each JSmol instance, in a page, has a unique ID.
    if ($matches[3] == "cif") {
        $loadscript = 'load \"'.$matches[2].'\" {1 1 1} PACKED; set antialiasDisplay on;';
    } else if ($matches[3] == "pdb" || $matches[3] == "pdb.gz") {
        $loadscript =  'set pdbAddHydrogens true; load \"'.$matches[2].'\"; set antialiasDisplay on;';
    } else {
        $loadscript = 'load \"'.$matches[2].'\"; set antialiasDisplay on;';
    }
    if (count($matches) > 8) {
        // Uncomment the following line to debug JMOLSCRIPT{}
        // echo "Found Jmol script: $matches[8]";
        // End of comment.
        $initscript = preg_replace("@(\s|<br />)+@si", " ",
        str_replace(array("\n", '"', '<br />'), array("; ", "", ""), $matches[8]));
    } else {
        $initscript = '';
    }
    // Force Java applet for binary files (.pdb.gz or .pse) with some browsers (IE, Chrome or Safari)
    $browser = strtolower($_SERVER['HTTP_USER_AGENT']);
    if ($matches[3] == "pdb.gz" || $matches[3] == "pse") { 
        if (strpos($browser,'ie')) {
            $technol = 'JAVA';
        } else if (strpos($browser,'chrome')) {
            $technol = 'JAVA';
        } else if (strpos($browser,'safari')) {
            $technol = 'JAVA';
        } else if (strpos($browser,'opera')) {
            $technol = 'HTML5';
        } else {
            $technol = 'HTML5';
        }
    } else {
        $technol = 'HTML5';	
    } 
    return "<div style='position relative; width: ".$size."px; height: ".$size."px; border: 1px solid lightgray'>
    <div id='jmoldiv".$id."' style='position: absolute; z-index: 0; width: ".$size."px; height: ".$size."px;'>
    <noscript>".$jsdisabled."</noscript>
    </div>
    </div>
    <div style='width: ".$size."px'>
    <!-- Début Modification Recia
    <div id='control".$id."' style='float: left'></div> -->
    <div id='control".$id."' style='float: center'></div>
    <!-- Fin Modification Recia -->
    <div id='download".$id."' style='float: right'>
    <a href='".$matches[2]."' title='".$downloadstructurefile."'>
    <img src='".$wwwroot."/filter/jmol/pix/download.png' />
    <!-- Début Modification Recia
    </a> <a href='".$wwwroot."/filter/jmol/lang/en/help/jmol/jmol.html' title='".$jmolhelp."'target='_blank'> -->
    </a> <a href='".$wwwroot."/filter/jmol/lang/fr/help/jmol/jmol.html' title='".$jmolhelp."'target='_blank'>
    <!-- Fin Modification Recia -->
    <img src='".$wwwroot."/filter/jmol/pix/help.png' />
    </a>
    </div>
    </div>
    <script type='text/javascript'>
    YUI().use('jsmol', 'node-base', function (Y) {
        var Info = {
            width: ".$size.",
            color: 'white',
            height: ".$size.",
            script: '".$loadscript.$initscript."',
            use: '".$technol."',
            /* Début Modification Recia
            serverURL: '".$wwwroot."/filter/jmol/yui/jsmol/jsmol.php', */
            serverURL: '".$wwwroot."/filter/jmol/yui/php/jsmol.php',
            // Fin Modification Recia
            j2sPath: '".$wwwroot."/filter/jmol/yui/jsmol/j2s',
            jarPath: '".$wwwroot."/filter/jmol/yui/jsmol/java',
            jarFile: 'JmolAppletSigned0.jar',
            isSigned: true,
            addSelectionOptions: false,
            readyFunction: null,
            console: 'jmol_infodiv',
            disableInitialConsole: true,
            disableJ2SLoadMonitor: true,
            defaultModel: null,
            debug: false
        }

        Y.on('load', function () {
            //Uncomment following if MathJax is installed
            //MathJax.Hub.Queue(function () {
                Jmol.setDocument(0);
        	Jmol._alertNoBinary = false;
        	Jmol.getApplet('jmol".$id."', Info);
                $('#jmoldiv".$id."').html(Jmol.getAppletHtml(jmol".$id."));
                $('#control".$id."').html(".$control.");
            //});
        });
    });
    </script>";
}
