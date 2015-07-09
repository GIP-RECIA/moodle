var currentnangongid = 0;
function nanogong_count_click(id) {
    if (currentnangongid == id) {
        currentnangongid = 0;
        return 0;
    }
    else {
        currentnangongid = id;
        return 1;
    }
}

function nanogong_get_closest_filterdiv(obj, divid) {
    var elem = document.getElementById(divid);
    
    var objparent = obj.parentNode;
    while (objparent.tagName.toLowerCase() != 'div' || objparent === elem) {
        objparent = objparent.parentNode;
    }
    return objparent;
}

function nanogong_set_div_position(obj, divid) {
    var elem = document.getElementById(divid);
    var curtop = obj.offsetParent.offsetTop;
    var curleft = obj.offsetParent.offsetLeft;
    var closestdiv = nanogong_get_closest_filterdiv(obj, divid);
    var maxwidth = closestdiv.offsetLeft + closestdiv.offsetWidth;

    if (maxwidth - curleft < 130) {
        curleft -= 130 - (maxwidth - curleft);
	curtop += 15;
    }
    else {
        curleft += obj.offsetWidth;
    }
    elem.style.top = curtop + 'px';
    elem.style.left = curleft + 'px';
}

function nanogong_show_applet(obj, id, contextid, modulename, filearea, itemid, name, baseurl) {
    var count = contextid + '' + itemid;
    var divid = 'nanogongfilterdiv' + count;
    var elem = document.getElementById(divid);
    if (elem.style.visibility == "visible") {
        elem.style.visibility = "hidden";
    }
    var clickcount = nanogong_count_click(id);
    if (clickcount) {
        var appletid = 'nanogongfilter' + count;
	var applet = document.getElementById(appletid);
        var nanogongurl = baseurl + '/filter/nanogong/nanogonggetfile.php?contextid=' + contextid + '&modulename=' + modulename + '&filearea=' + filearea + '&itemid=' + itemid + '&filename=' + name;        
	nanogong_set_div_position(obj, divid);
        elem.style.visibility = "visible";
        applet.sendGongRequest('LoadFromURL', nanogongurl);
        applet.sendGongRequest('PlayMedia', 'audio');
    }
}
