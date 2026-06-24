<?php
require __DIR__.'/../config/db.php';
header('Content-Type: application/json');
 = ->query('SELECT * FROM services');
 = ->fetchAll();
echo json_encode();
?>
