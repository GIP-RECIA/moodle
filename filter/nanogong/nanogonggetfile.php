<?php // Serving files to the NanoGong applet.

require_once(dirname(dirname(dirname(__FILE__))) . '/config.php');

require_login();  // CONTEXT_SYSTEM level

$contextid = required_param('contextid', PARAM_INT);
$modulename = required_param('modulename', PARAM_RAW);
$filearea = required_param('filearea', PARAM_RAW);
$itemid = required_param('itemid', PARAM_INT);
$name = required_param('filename', PARAM_RAW);

$fs = get_file_storage();
$file = $fs->get_file($contextid, $modulename, $filearea, $itemid, '/', $name);
if ($file) {
    $contenthash = $file->get_contenthash();
    $l1 = $contenthash[0].$contenthash[1];
    $l2 = $contenthash[2].$contenthash[3];
    $nanogongfile = $CFG->dataroot . '/filedir/' . $l1 . '/' . $l2. '/' . $contenthash;
    
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $file->get_filename() . '"');
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: private, must-revalidate, pre-check=0, post-check=0, max-age=0');
    header('Expires: '. gmdate('D, d M Y H:i:s', 0) .' GMT');
    header('Pragma: no-cache');
    header('Content-Length: ' . $file->get_filesize());
    //ob_clean();
    flush();
    readfile($nanogongfile);
}
else {
   error('The required file does not exist');
}

?>
