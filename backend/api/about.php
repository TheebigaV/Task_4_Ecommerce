<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require __DIR__.'/../config/db.php';

try {
    $stmt = $pdo->query('SELECT * FROM about_us');
    $about = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($about);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
