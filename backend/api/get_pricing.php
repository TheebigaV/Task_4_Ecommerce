<?php
// backend/api/get_pricing.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$fallback_plans = [
    [
        'tier_name' => 'Basic Plan',
        'price_monthly' => 49.00,
        'price_yearly' => 470.00,
        'description' => 'Ideal for startups and small operations needing basic security and IT advisory.',
        'features' => '1 Core Consultant;Monthly Auditing;Standard Cloud Support;Email Help Desk',
        'is_popular' => 0
    ],
    [
        'tier_name' => 'Pro Plan',
        'price_monthly' => 99.00,
        'price_yearly' => 950.00,
        'description' => 'Best for growing businesses requiring fast Response SLA and deep operations management.',
        'features' => '3 Dedicated Consultants;Weekly Auditing;Advanced DevOps Support;24/7 Priority Help Desk;Vulnerability Scanning',
        'is_popular' => 1
    ],
    [
        'tier_name' => 'Enterprise Plan',
        'price_monthly' => 249.00,
        'price_yearly' => 2390.00,
        'description' => 'A complete strategy and operational suite for large enterprise networks.',
        'features' => 'Unlimited Consultants;Daily Real-time Auditing;Multi-cloud Ops & Kubernetes;Dedicated Account Manager;Custom SLA Guarantees',
        'is_popular' => 0
    ]
];

try {
    @include_once __DIR__ . '/../config/db.php';
    
    if (isset($pdo)) {
        $stmt = $pdo->query("SELECT tier_name, price_monthly, price_yearly, description, features, is_popular FROM pricing_plans ORDER BY id ASC");
        $plans = $stmt->fetchAll();
        
        if ($plans) {
            echo json_encode($plans);
        } else {
            echo json_encode($fallback_plans);
        }
    } else {
        throw new Exception("Database PDO object is not initialized.");
    }
} catch (\Exception $e) {
    echo json_encode($fallback_plans);
}
