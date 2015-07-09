#!/bin/bash
# Il faudrait vérifier que c'est root qui lance le script et faire les chown www-data:www-data pour le nouveau theme
if [ -z $1 ]
then echo "Vous de devez fournir le nom du nouveau theme en paramètre à cette fonction"
else 
    RepACopier=$2
    NouveauTheme=$1
	ln -s $RepACopier $NouveauTheme
fi
