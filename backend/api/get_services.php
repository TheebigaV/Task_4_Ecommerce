<?php
// backend/api/get_services.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$fallback_services = [
    [
        'icon' => 'Cpu',
        'title' => 'IT Consulting',
        'description' => 'Strategic advisory services to help align technology with business goals and streamline enterprise architectures.',
        'features' => 'Tech Auditing;Strategy Development;Architecture Design;System Integration'
    ],
    [
        'icon' => 'Shield',
        'title' => 'Cyber Security',
        'description' => 'Comprehensive protection strategies including assessments, monitoring, and network hardening to protect sensitive data.',
        'features' => 'Vulnerability Scanning;24/7 Security Monitoring;Compliance Auditing;Incident Response'
    ],
    [
        'icon' => 'Cloud',
        'title' => 'Cloud Operations',
        'description' => 'Seamless cloud migrations, hybrid deployments, cost optimization, and automated DevOps CI/CD pipeline setups.',
        'features' => 'AWS/Azure Migrations;Cost Optimization;Kubernetes Management;DevOps Automation'
    ],
    [
        'icon' => 'Rocket',
        'title' => 'Digital Strategy',
        'description' => 'Innovative solutions to accelerate product design, custom software planning, and UI/UX optimization for engagement.',
        'features' => 'UI/UX Enhancement;Product Roadmapping;Agile Training;Scalability Diagnostics'
    ]
];

try {
    @include_once __DIR__ . '/../config/db.php';
    
    if (isset($pdo)) {
        $stmt = $pdo->query("SELECT icon, title, description, features FROM services ORDER BY id ASC");
        $services = $stmt->fetchAll();
        
        if ($services) {
            echo json_encode($services);
        } else {
            echo json_encode($fallback_services);
        }
    } else {
        throw new Exception("Database PDO object is not initialized.");
    }
} catch (\Exception $e) {
    echo json_encode($fallback_services);
}
