<?php
// backend/api/submit_order.php
// Saves order to DB after checkout

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

require_once __DIR__ . '/../config/db.php';

$orderId = 'ORD-' . strtoupper(bin2hex(random_bytes(4)));

if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO orders (order_id, plan, price, billing, first_name, last_name, email, phone, address, city, zip, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $orderId,
            $data['plan'] ?? '',
            $data['price'] ?? 0,
            $data['billing'] ?? 'monthly',
            $data['firstName'] ?? '',
            $data['lastName'] ?? '',
            $data['email'] ?? '',
            $data['phone'] ?? '',
            $data['address'] ?? '',
            $data['city'] ?? '',
            $data['zip'] ?? '',
        ]);
        echo json_encode(['success' => true, 'orderId' => $orderId]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Order save failed: ' . $e->getMessage()]);
    }
} else {
    // Demo mode without DB
    echo json_encode(['success' => true, 'orderId' => $orderId, 'note' => 'Demo mode - no database']);
}
