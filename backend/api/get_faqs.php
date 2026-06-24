<?php
// backend/api/get_faqs.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$fallback_faqs = [
    [
        'question' => 'How do your consulting retainer plans work?',
        'answer' => 'Our consulting retainers provide a set of dedicated engineering hours and advisors on call each month, customized to your deployment architecture.'
    ],
    [
        'question' => 'Is the PayHere payment sandbox secure?',
        'answer' => 'Yes, the PayHere sandbox replicates the exact security protocols of PayHere Production, allowing complete validation of order checkouts safely without charging live credit cards.'
    ],
    [
        'question' => 'Can I upgrade or downgrade my tier later?',
        'answer' => 'Absolutely. You can request changes to your service plan monthly, and billing adjustments will be prorated automatically in your next invoice cycle.'
    ]
];

try {
    @include_once __DIR__ . '/../config/db.php';
    
    if (isset($pdo)) {
        $stmt = $pdo->query("SELECT question, answer FROM faqs ORDER BY id ASC");
        $faqs = $stmt->fetchAll();
        
        if ($faqs) {
            echo json_encode($faqs);
        } else {
            echo json_encode($fallback_faqs);
        }
    } else {
        throw new Exception("Database PDO object is not initialized.");
    }
} catch (\Exception $e) {
    echo json_encode($fallback_faqs);
}
