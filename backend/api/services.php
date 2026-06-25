<?php
require __DIR__.'/../config/db.php';
header('Content-Type: application/json');
$stmt = $pdo->query('SELECT * FROM services');
$services = $stmt->fetchAll();
echo json_encode($services);
?>
