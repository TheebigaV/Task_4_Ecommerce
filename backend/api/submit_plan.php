<?php
// backend/api/submit_plan.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed. Only POST is supported.']);
    exit;
}

require_once __DIR__ . '/../config/db.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$reason = trim($input['reason'] ?? '');

// Simple Validation
if (empty($name) || empty($email) || empty($reason)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and reason options are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address format.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO financial_plans (name, email, subject, reason) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $reason]);
    echo json_encode(['success' => true, 'message' => 'Financial plan request saved successfully.']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
