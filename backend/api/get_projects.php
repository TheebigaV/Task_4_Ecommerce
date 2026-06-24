<?php
// backend/api/get_projects.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/db.php';

try {
    $stmt = $pdo->query("SELECT category, title, budget, deadline_or_estimated, client_or_technology FROM projects ORDER BY id ASC");
    $allProjects = $stmt->fetchAll();
    
    // Group projects by category
    $grouped = [
        'web_design' => [],
        'graphics' => [],
        'web_coding' => []
    ];
    
    foreach ($allProjects as $project) {
        $cat = $project['category'];
        if (array_key_exists($cat, $grouped)) {
            $grouped[$cat][] = [
                'title' => $project['title'],
                'budget' => $project['budget'],
                'deadline_or_estimated' => $project['deadline_or_estimated'],
                'client_or_technology' => $project['client_or_technology']
            ];
        }
    }
    
    echo json_encode($grouped);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Query failed: ' . $e->getMessage()
    ]);
}
