<?php
// backend/api/payhere_notify.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// PayHere sends standard application/x-www-form-urlencoded POST variables
$merchant_id         = $_POST['merchant_id'] ?? '';
$order_id            = $_POST['order_id'] ?? '';
$payment_id          = $_POST['payment_id'] ?? '';
$payhere_amount      = $_POST['payhere_amount'] ?? '';
$payhere_currency    = $_POST['payhere_currency'] ?? '';
$status_code         = $_POST['status_code'] ?? '';
$md5sig              = $_POST['md5sig'] ?? '';

$merchant_secret = 'NDA2OTExNDA3NzI5NzU5NjA0MTUzMzA5Mjk5MTY2MTk0MzY2NTY1Ng=='; // Sandbox merchant secret for localhost

// Calculate signature verification
$merchant_secret_md5_upper = strtoupper(md5($merchant_secret));
$local_signature = strtoupper(
    md5(
        $merchant_id . 
        $order_id . 
        $payhere_amount . 
        $payhere_currency . 
        $status_code . 
        $merchant_secret_md5_upper
    )
);

// Verify signature authenticity
if ($local_signature !== $md5sig) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid payment signature key authentication.']);
    exit;
}

// Map payment status based on PayHere status_code:
// 2 = Success, 0 = Pending, -1 = Cancelled, -2 = Failed
$payment_status = 'pending';
if ($status_code == 2) {
    $payment_status = 'completed';
} elseif ($status_code == -1) {
    $payment_status = 'cancelled';
} elseif ($status_code == -2) {
    $payment_status = 'failed';
}

// Update DB status
try {
    @include_once __DIR__ . '/../config/db.php';
    if (isset($pdo)) {
        $stmt = $pdo->prepare("UPDATE orders SET payment_status = ?, payhere_payment_id = ? WHERE id = ?");
        $stmt->execute([$payment_status, $payment_id, $order_id]);
        echo json_encode(['success' => true, 'message' => 'Order status updated successfully.']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Sandbox notification accepted (mock DB success).']);
    }
} catch (\Exception $e) {
    error_log("Database notify update failed: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error during status update: ' . $e->getMessage()]);
}
