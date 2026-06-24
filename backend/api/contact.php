<?php
// backend/api/contact.php
// Handles contact form submissions via PHPMailer + Mailtrap SMTP Sandbox

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

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required']);
    exit;
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Sanitize inputs
$name    = htmlspecialchars(strip_tags($data['name']));
$email   = htmlspecialchars(strip_tags($data['email']));
$subject = htmlspecialchars(strip_tags($data['subject'] ?? 'No Subject'));
$message = htmlspecialchars(strip_tags($data['message']));

// Save to DB if available
require_once __DIR__ . '/../config/db.php';

if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$name, $email, $subject, $message]);
    } catch (PDOException $e) {
        error_log("Contact save failed: " . $e->getMessage());
    }
}

// ─── PHPMailer + Mailtrap SMTP Sandbox ────────────────────────────────────
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mailResponse = '';

try {
    $mail = new PHPMailer(true);

    // ── SMTP Configuration (Mailtrap Sandbox) ──
    $mail->isSMTP();
    $mail->Host       = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'a329e1ea9024e3';
    $mail->Password   = '022d93551f2c90';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 2525;

    // ── Sender & Recipient ──
    $mail->setFrom('no-reply@mexant.dev', 'Mexant Website');
    $mail->addAddress('theebidev@gmail.com', 'Mexant Admin');
    $mail->addReplyTo($email, $name); // Reply directly to the visitor

    // ── Email Content ──
    $mail->isHTML(true);
    $mail->Subject = "New Contact Form Message: {$subject}";
    $mail->Body    = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px; border-radius: 10px;'>
      <div style='background: linear-gradient(135deg, #6366f1, #a78bfa); padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;'>
        <h2 style='color: white; margin: 0; font-size: 20px;'>📬 New Contact Form Submission</h2>
        <p style='color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;'>From your Mexant website contact form</p>
      </div>

      <table style='width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;'>
        <tr style='border-bottom: 1px solid #e5e7eb;'>
          <td style='padding: 14px 18px; color: #6b7280; font-size: 13px; font-weight: 600; width: 90px;'>NAME</td>
          <td style='padding: 14px 18px; color: #111827; font-size: 15px;'>{$name}</td>
        </tr>
        <tr style='border-bottom: 1px solid #e5e7eb;'>
          <td style='padding: 14px 18px; color: #6b7280; font-size: 13px; font-weight: 600;'>EMAIL</td>
          <td style='padding: 14px 18px;'><a href='mailto:{$email}' style='color: #6366f1; text-decoration: none;'>{$email}</a></td>
        </tr>
        <tr style='border-bottom: 1px solid #e5e7eb;'>
          <td style='padding: 14px 18px; color: #6b7280; font-size: 13px; font-weight: 600;'>SUBJECT</td>
          <td style='padding: 14px 18px; color: #111827; font-size: 15px;'>{$subject}</td>
        </tr>
      </table>

      <div style='background: white; border-radius: 8px; margin-top: 16px; padding: 18px; border-left: 4px solid #6366f1;'>
        <p style='color: #6b7280; font-size: 13px; font-weight: 600; margin: 0 0 10px;'>MESSAGE</p>
        <p style='color: #111827; font-size: 15px; line-height: 1.7; margin: 0;'>" . nl2br($message) . "</p>
      </div>

      <p style='color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;'>
        This email was intercepted by Mailtrap sandbox &mdash; no real email was delivered to the visitor.
      </p>
    </div>";

    $mail->AltBody = "New Contact Form Submission\n\nName: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}";

    $mail->send();
    $mailResponse = ' Email captured in Mailtrap sandbox successfully!';

} catch (Exception $e) {
    error_log("PHPMailer Error: {$e->getMessage()}");
    $mailResponse = ' (Email delivery failed: ' . $e->getMessage() . ')';
}

echo json_encode([
    'success' => true,
    'message' => "Thank you, {$name}! Your message has been received." . $mailResponse,
]);
