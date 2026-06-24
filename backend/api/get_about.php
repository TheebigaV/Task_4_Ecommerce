<?php
// backend/api/get_about.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$fallback_team = [
    ['name' => 'Sarah Jenkins', 'role' => 'CEO & Founder', 'image' => '/assets/images/client-01.png'],
    ['name' => 'Michael Chen', 'role' => 'Chief Technology Officer', 'image' => '/assets/images/client-01.png'],
    ['name' => 'Elena Rostova', 'role' => 'Principal UI/UX Designer', 'image' => '/assets/images/client-01.png'],
    ['name' => 'David Kalu', 'role' => 'Director of Cloud Operations', 'image' => '/assets/images/client-01.png']
];

$fallback_values = [
    ['icon' => 'Lightbulb', 'title' => 'Innovation First', 'description' => 'Constantly pushing technological boundaries to design next-generation enterprise systems.'],
    ['icon' => 'Users', 'title' => 'Client Collaboration', 'description' => 'Working side-by-side with partners to solve complex process challenges transparently.'],
    ['icon' => 'Award', 'title' => 'Uncompromising Integrity', 'description' => 'Adhering to high ethical standards in software architecture, security, and consulting data.']
];

try {
    // Attempt database load
    @include_once __DIR__ . '/../config/db.php';
    
    if (isset($pdo)) {
        $stmtTeam = $pdo->query("SELECT name, role, image FROM team_members");
        $team = $stmtTeam->fetchAll();
        
        $stmtValues = $pdo->query("SELECT icon, title, description FROM core_values");
        $values = $stmtValues->fetchAll();
        
        echo json_encode([
            'success' => true,
            'source' => 'database',
            'team' => $team ?: $fallback_team,
            'values' => $values ?: $fallback_values
        ]);
    } else {
        throw new Exception("Database PDO object is not initialized.");
    }
} catch (\Exception $e) {
    // Fallback gracefully
    echo json_encode([
        'success' => true,
        'source' => 'fallback',
        'team' => $fallback_team,
        'values' => $fallback_values
    ]);
}
