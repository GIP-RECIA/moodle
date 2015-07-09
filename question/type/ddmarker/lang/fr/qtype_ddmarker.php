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
 *
 * @package    qtype
 * @subpackage ddmarker
 * @copyright  2011 The Open University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['addmoreitems'] = 'Espace pour {no} zones de drop';
$string['alttext'] = 'Text alternatif';
$string['answer'] = 'Réponse';
$string['bgimage'] = 'Image de fond';
$string['coords'] = 'coordonnées  ';
$string['correctansweris'] = 'La bonne réponse est: {$a}';
$string['draggableimage'] = 'Image deplacable';
$string['draggableitem'] = 'Elément deplacable';
$string['draggableitemheader'] = 'Elément deplacable {$a}';
$string['draggableitemtype'] = 'Type';
$string['draggableword'] = 'Texte deplacable';
$string['dropbackground'] = 'Image de fond où deplacer les markers';
$string['dropzone'] = 'Zone de drop {$a}';
$string['dropzoneheader'] = 'Zones de drop';
$string['followingarewrong'] = 'Les markers suivant ne sont pas bien placés : {$a}.';
$string['followingarewrongandhighlighted'] = 'Les markers suivant ne sont pas bien placés :  {$a}. Les markers surlignés sont maintenant placé au bon endroit.<br /> Cliquez sur le marker pour affichier la bonne zone de depot.';
$string['formerror_nobgimage'] = 'Vous devez sélectionner une image à utiliser en image de fond pour les zones de drop.';
$string['formerror_noitemselected'] = 'Vous avez créer une zone de drop, mais vous n\'avez pas choisi de marker associé.';
$string['formerror_nosemicolons'] = 'Il n\'y a pas de ; dans vos coordonnées. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['formerror_onlysometagsallowed'] = 'Seul les tags "{$a}" sont autorisés dans les libellés des markers';
$string['formerror_onlyusewholepositivenumbers'] = 'Veuillez utiliser uniquement des nombres entier positifs pour spécifier les coordonnées x et y ainsi que les largeurs et hauteurs. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['formerror_polygonmusthaveatleastthreepoints'] = 'Vous devez spécifier au moins trois points pour un polygone. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['formerror_shapeoutsideboundsofbgimage'] = 'La forme définie dépasse les limites de l\'image.';
$string['formerror_toomanysemicolons'] = 'Il y a trop de ; dans vos coordonnées. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['formerror_unrecognisedwidthheightpart'] = 'La hauteur et la largeur n\'ont pas été reconues. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['formerror_unrecognisedxypart'] = 'Les coordonnées x et y n\'ont pas été reconues. Vous coordonnées pour un {$a->shape} doivent être indiquées sous la forme - {$a->coordsstring}.';
$string['infinite'] = 'Infin';
$string['marker'] = 'Marker';
$string['marker_n'] = 'Marker {no}';
$string['markers'] = 'Markers';
$string['nolabel'] = 'Pas de libellé';
$string['pleasedragatleastonemarker'] = 'Votre reponse n\'est pas complete. Vous devez placer au moins un marker sur l\' image.';
$string['pluginname'] = 'Drag and drop markers';
$string['pluginname_help'] = 'Séléctionnez une image de fond, entrez des libellés pour les markers et définissez les zones de drop sur l\'image de fond.';
$string['pluginname_link'] = 'question/type/ddmarker';
$string['pluginnameadding'] = 'Ajouter une question drag and drop markers';
$string['pluginnameediting'] = 'Modifier une question drag and drop markers';
$string['pluginnamesummary'] = 'Les markers sont deplacé sur l\'image de fond.';
$string['previewarea'] = 'Zone de prévisualisation -';
$string['previewareaheader'] = 'Prévisualisation';
$string['previewareamessage'] = 'Sélectionnez une image de fond et entrez du texte pour les markers, définissez les zones de drop.';
$string['refresh'] = 'Rafraichir la prévisualisation';
$string['clearwrongparts'] = 'Déplace les markers mal positionnés sous l\'image.';
$string['shape'] = 'Forme';
$string['shape_circle'] = 'Cercle';
$string['shape_circle_lowercase'] = 'cercle';
$string['shape_circle_coords'] = 'x,y;r (où x,y sont les coordonnées du centre du cercle et r est le rayon)';
$string['shape_rectangle'] = 'Rectangle';
$string['shape_rectangle_lowercase'] = 'rectangle';
$string['shape_rectangle_coords'] = 'x,y;w,h (où x,y sont les coordonnées du coin supérieure gauche et w et h sont la largeur (width) et la hauteur (height))';
$string['shape_polygon'] = 'Polygone';
$string['shape_polygon_lowercase'] = 'polygone';
$string['shape_polygon_coords'] = 'x1,y1;x2,y2;x3,y3;x4,y4....(où x1, y1 sont les coordonnées du premier point, x2, y2 sont les coordonnées du second point, etc. Vous n\'avez pas besoin de répeter les coordinnées du premier point pour fermer le polygone)';
$string['showmisplaced'] = 'Highlight drop zones which have not had the correct marker dropped on them';
$string['shuffleimages'] = 'Mélanger les élements à chaque fois que la question est posée';
$string['stateincorrectlyplaced'] = 'Afficher les markers mal positionnés';
$string['summariseplace'] = '{$a->no}. {$a->text}';
$string['summariseplaceno'] = 'Zone de drop {$a}';
$string['ytop'] = 'Haut';