<?php
require __DIR__.'/../config/db.php';
header('Content-Type: application/json');
 = ->query('SELECT * FROM about_us');
 = ->fetchAll();
echo json_encode();
?>
