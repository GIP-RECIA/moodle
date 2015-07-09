<?php
/*
 * GeoGebra Moodle filter
 * Copyright (C) 2009 Sara Arjona, Florian Sonner, Christoph Reinisch
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * GeoGebra filter english language defs
 *
 * @package    filter
 * @subpackage geogebra
 * @copyright  2011 Sara Arjona, Florian Sonner, Christoph Reinisch
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['filtername'] = 'Filtre GeoGebra';

$string['enableheading'] = 'Enable Filter';
$string['enableheading_help'] = 'Select for which Links the filter should be enabled.';
$string['sitegeogebratube'] = 'Links to GeoGebraTube';
$string['sitegeogebratube_help'] = 'GeoGebraTube, the new material manager for GeoGebra';
$string['ggbfile'] = 'Links to GeoGebra Files';
$string['ggbfile_help'] = 'GeoGebra Files with the extension .ggb';
$string['ggtfile'] = 'Links to GeoGebra Tool Files';
$string['ggtfile_help'] = 'GeoGebra Tool Files with the extension .ggt';

$string['dimensionsheading'] = 'Dimensions';
$string['dimensionsheading_help'] = 'Les dimensions par défaut de l\'applet.';
$string['localdimensheading'] = 'Dimensions';
$string['localdimensheading_help'] = 'Hauteur et largeur de l\'applet en px. Si vide, les valeurs par défaut du site sont utilisées.';
$string['width'] = 'Largeur';
$string['height'] = 'Hauteur';
$string['width_help'] = 'Largeur par défaut de l\'applet en px';
$string['height_help'] = 'Hauteur par défaut de l\'applet en px';

$string['jarheading'] = 'GeoGebra jar-file';
$string['jarheading_help'] = 'Set the URL to the geogebra.jar. Do not change unless you know what you\'re doing';
$string['urljar'] = 'URL to geogebra.jar';
$string['urljar_help'] = 'Choose which jars should be used, Latest from GeoGebra.org is recommended, but if you are on a secure connection you might prefer the jars from your own webserver.';

$string['functionalityheading'] = 'Fonctionnalités';
$string['functionalityheading_help'] = 'Configuration des fonctionnalitées. La configuration peut aussi être faite dans le contexte d\'un cours, d\'une ressource ou bien d\'une activité.';
$string['enable_rightclick'] = 'Activer le clic-droit';
$string['enable_rightclick_help'] = 'states whether right clicks should be handled by the applet. Setting this parameter to "false" disables context menus, properties dialogs and right-click-zooming. NB also enables/disables some keyboard shortcuts eg Delete and Ctrl-R (recompute all objects).';
$string['enable_labeldrags'] = 'Activer le deplacement des libellés';
$string['enable_labeldrags_help'] = 'states whether labels can be dragged.';
$string['show_reseticon'] = 'Afficher l\'icone de reinitialisation';
$string['show_reseticon_help'] = 'states whether a small icon (GeoGebra ellipse) should be shown in the upper right corner of the applet. Clicking on this icon resets the applet (i.e. it reloads the file given in the filename parameter).';
$string['framepossible'] = 'Activer "Double clic ouvre une fenêtre"';
$string['framepossible_help'] = 'states if a double click on the drawing pad should open the GeoGebra application frame. This parameter is ignored if the type was set to "button".';

$string['interfaceheading'] = 'Interface utilisateur';
$string['interfaceheading_help'] = 'Parametrage de l\'interface utilisateur. Configuration des fonctionnalitées. La configuration peut aussi être faite dans le contexte d\'un cours, d\'une ressource ou bien d\'une activité.';
$string['show_menubar'] = 'Afficher la barre de menu';
$string['show_menubar_help'] = 'states whether the menubar of GeoGebra should be shown in the applet.';
$string['show_toolbar'] = 'Afficher la barre d\'outil';
$string['show_toolbar_help'] = 'states whether the toolbar with the construction mode buttons should be shown in the applet.';
$string['show_toolbarhelp'] = 'Afficher la barre d\'aide';
$string['show_toolbarhelp_help'] = 'states whether the toolbar help text right to the toolbar buttons should be shown in the applet.';
$string['show_algebrainput'] = 'Afficher la barre de saisie';
$string['show_algebrainput_help'] = 'states whether the algebra input line (with input field, greek letters and command list) should be shown in the applet.';
$string['show_animationbutton'] = 'Afficher le bouton d\'animation';
$string['show_animationbutton_help'] = 'Show animation button - only GeoGebra 4 and newer';

$string['languageheading'] = 'Langue';
$string['languageheading_help'] = 'Language specific options';
$string['iso_language'] = 'Code ISO de langue (deux lettres)';
$string['iso_language_help'] = 'GeoGebra tries to set your local language 
	automatically (if it is available among the supported languages, 
	of course). The default language for unsupported languages is English. If you want 
	to specify a certain language manually, please use this parameter. (en ... English, 
	fr ... French, it ... Italian, de ... German, es ... Spanish, sl ... Slovenian, 
	..., zh ... Chinese), Refer to ISO 639-1 for more language codes';
$string['iso_country'] = 'Code ISO de pays';
$string['iso_country_help'] = 'This parameter only makes sense if you use it together with the language parameter. (AT ... Austria) Refer to ISO 3166 for more language codes';

$string['miscellaneousheading'] = 'Divers';
$string['miscellaneousheading_help'] = 'Options diverses';
$string['error_dialogs'] = 'Afficher les messages d\'erreur';
$string['error_dialogs_help'] = 'States whether error dialogs will be shown if an invalid input is entered (using the Input Bar or JavaScript)';
$string['use_browserforjs'] = 'Utiliser le navigateur pour le JS';
$string['use_browserforjs_help'] = 'Use the Browser for JS - only GeoGebra 4 and newer. For this setting to work you would have to make sure that the javascript is placed in the HTML (not possible using the Filter right now)';
$string['allow_rescaling'] = 'Autoriser l\'applet à retailler le graphique';
$string['allow_rescaling_help'] = 'Determines whether the applet will attempt to rescale the Graphics View when the applet is loaded or the size is changed (eg Zooming in the browser). Disabled if the Spreadsheet or Algebra View are showing.';
$string['on_initparam'] = 'Argument passé au JavaScript lors de l\'appel à la fonction ggbOnInit()';
$string['on_initparam_help'] = 'This parameter allows you to specify the argument passed to the JavaScript function ggbOnInit(), which is called once the applet is fully initialised. 
This is useful when you have multiple applets on a page - see http://www.geogebra.org/source/program/applet/geogebra_applet_java2java.htm';
$string['show_button'] = 'Afficher le bouton pour ouvrir l\'application';
$string['show_button_help'] = 'If you use this parameter the applet will ONLY show a button to open the GeoGebra application frame (all other options are useless then)';
$string['use_objecttag'] = 'Utiliser le tag object tag au lieu du tag applet pour embarquer l\'applet ';
$string['use_objecttag_help'] = 'Maybe useful, if you use a DTD where the applet tag is deprecated or doesn\'t exist anymore.';
$string['embed_id'] = 'Identifiant HTML';
$string['embed_id_help'] = 'The HTML id for the applet or object. By default the name attribute is used with the applet tag';
$string['embed_class'] = 'Classe HTML';
$string['embed_class_help'] = 'The HTML class for the applet or object. None is default, you can specify more than one seperated by a blank.';


$string['javavmheading'] = 'Java VM arguments';
$string['javavmheading_help'] = 'Java VM arguments - be careful';
$string['javavm_params'] = 'Java VM parameter';
$string['javavm_params_help'] = 'This parameter allows you to specify more memory (in megabytes) for the 
	GeoGebra applet Works only in Java 6 update 10 or later 
	(will have no effect in earlier versions), eg. -Xmx256m';


$string['defaultforsite'] = 'Valeur par défaut du site';

$string['geogebra_use'] = 'Use';
$string['geogebra_local'] = '4.0 from this webserver';
$string['geogebra_local32'] = '3.2 from this webserver';

$string['geogebra_external'] = 'from GeoGebra.org';
$string['geogebra_latest'] = 'latest release from GeoGebra.org';
$string['geogebra_external32'] = '3.2 release from GeoGebra.org';
$string['geogebra_external40'] = '4.0 release from GeoGebra.org';
$string['geogebra_external42'] = '4.2 beta from GeoGebra.org (not recommended, except for testing)';

