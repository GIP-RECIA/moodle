#!/bin/bash
# Il faudrait vérifier que c'est root qui lance le script et faire les chown www-data:www-data pour le nouveau theme
if [ -z $1 ] && [ -z $2 ]
then echo "Vous de devez fournir le nom du nouveau theme et le nom du theme a copier en paramètre à cette fonction"
else
    NouveauTheme=$1
    RepACopier=$2
    rm -r "./$NouveauTheme"
	cp -R $RepACopier $NouveauTheme
	cd $NouveauTheme
    #rm `find ./pix/ -type f ! -name logo.png`
    rm -r layout
    ln -s ../$RepACopier/layout layout
    rm pix/screenshot.jpg
    rm settings.php
    str1="$THEME->name = '$RepACopier'"
    str2="$THEME->name = '$NouveauTheme'"
	sed -e "s/$str1/$str2/" config.php > config.php.new
	mv config.php.new config.php
    str1="$THEME->parents = array("
    str2=$str1"'"$RepACopier"', "
    sed -e "s/$str1/$str2/" config.php > config.php.new
	mv config.php.new config.php
    str1="$THEME->sheets = array("
    str2=$str1"'"$NouveauTheme"', "
    sed -e "s/$str1/$str2/" config.php > config.php.new
	mv config.php.new config.php
	sed -e "s/$RepACopier/$NouveauTheme/" version.php > version.php.new
	mv version.php.new version.php
	sed -e "s/$RepACopier/$NouveauTheme/" lang/en/theme_$RepACopier.php > lang/en/theme_$NouveauTheme.php
	rm lang/en/theme_$RepACopier.php
    if [ -z $3 ]
    then (
        rm -r style
    ) else
        rm style/*
        printf ".navbar .btn-navbar .icon-bar {\n    background-color: #$3;\n}\na { color: #$3; }\n.navbar .nav\nli.dropdown.open > .dropdown-toggle {\n	color : #$3;\n}" >> style/$NouveauTheme.css
    fi
	cd ..
fi
