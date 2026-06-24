<?php
// backend/api/get_testimonials.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/db.php';

try {
    $stmt = $pdo->query("SELECT id, quote, author, role, image FROM testimonials ORDER BY id ASC");
    $testimonials = $stmt->fetchAll();
    echo json_encode($testimonials);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Query failed: ' . $e->getMessage()
    ]);
}
