<?php
// Debug script - run via: http://localhost:8000/api/debug_hash.php
header('Content-Type: text/plain');

$merchant_id     = '1236501';
$merchant_secret = 'NTc2MjEyMjU4MTk5Nzk2MjM5OTcyOTkwODY5NDMwODkzMDU0Mw==';
$order_id        = 'LUM-TEST001';
$amount          = number_format(29, 2, '.', '');
$currency        = 'LKR';

// --- Approach 1: Use base64 string AS-IS ---
$secret_md5_A        = strtoupper(md5($merchant_secret));
$hash_A              = strtoupper(md5($merchant_id . $order_id . $amount . $currency . $secret_md5_A));

// --- Approach 2: base64_DECODE the secret first ---
$merchant_secret_decoded = base64_decode($merchant_secret);
$secret_md5_B        = strtoupper(md5($merchant_secret_decoded));
$hash_B              = strtoupper(md5($merchant_id . $order_id . $amount . $currency . $secret_md5_B));

echo "merchant_secret (raw)    : $merchant_secret\n";
echo "merchant_secret (decoded): $merchant_secret_decoded\n\n";

echo "=== Approach 1: Hash using base64 string AS-IS ===\n";
echo "UPPER MD5(secret)        : $secret_md5_A\n";
echo "FINAL HASH               : $hash_A\n\n";

echo "=== Approach 2: Hash using BASE64 DECODED secret ===\n";
echo "UPPER MD5(decoded secret): $secret_md5_B\n";
echo "FINAL HASH               : $hash_B\n\n";

echo "Copy both hashes and share them - one of them will be the CORRECT one!\n";
