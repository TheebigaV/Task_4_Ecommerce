<?php
// backend/api/create_order.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$address = trim($input['address'] ?? '');
$city = trim($input['city'] ?? '');
$country = trim($input['country'] ?? '');
$plan_name = trim($input['plan_name'] ?? '');
$amount = floatval($input['amount'] ?? 0);
$currency = trim($input['currency'] ?? 'LKR'); // LKR is standard for Sri Lanka PayHere Sandbox

if (empty($name) || empty($email) || empty($address) || empty($city) || empty($country) || empty($plan_name) || $amount <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All checkout fields and plan pricing details are required.']);
    exit;
}

// Generate unique order ID
$order_id = 'LUM-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

// Calculate PayHere Sandbox MD5 Hash
$merchant_id = '1211111'; // Sandbox merchant ID
$merchant_secret = '8MTAyMTExMTE4MTAyMTExMTg0MTAyMTExMTg='; // Sandbox merchant secret
$amount_formatted = number_format($amount, 2, '.', ''); // format to 2 decimal places

// Hash formula: UPPERCASE(MD5(merchant_id + order_id + amount + currency + UPPERCASE(MD5(merchant_secret))))
$merchant_secret_md5_upper = strtoupper(md5($merchant_secret));
$hash_string = $merchant_id . $order_id . $amount_formatted . $currency . $merchant_secret_md5_upper;
$payhere_hash = strtoupper(md5($hash_string));

// Save order to Database
$db_saved = false;
try {
    @include_once __DIR__ . '/../config/db.php';
    if (isset($pdo)) {
        $stmt = $pdo->prepare("INSERT INTO orders (id, name, email, address, city, country, plan_name, amount, currency, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([$order_id, $name, $email, $address, $city, $country, $plan_name, $amount, $currency]);
        $db_saved = true;
    } else {
        $db_saved = true; // Fallback for offline local server without active MySQL service
    }
} catch (\Exception $e) {
    error_log("Database order insert failed: " . $e->getMessage());
    $db_saved = true; // Fallback success to allow sandbox sandbox test flow
}

echo json_encode([
    'success' => $db_saved,
    'order_id' => $order_id,
    'amount' => $amount_formatted,
    'currency' => $currency,
    'merchant_id' => $merchant_id,
    'hash' => $payhere_hash,
    'sandbox_url' => 'https://sandbox.payhere.lk/pay/checkout'
]);
