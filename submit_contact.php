<?php
header('Content-Type: application/json'); // Indicate JSON response
require_once 'db_config.php'; // Include your database configuration

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic input validation
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['message'] = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format.';
    } else {
        $conn = createDbConnection();

        if ($conn) {
            $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");

            if ($stmt) {
                $stmt->bind_param("ssss", $name, $email, $subject, $message);

                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Message sent successfully!';
                } else {
                    $response['message'] = 'Error sending message. Please try again later.';
                    error_log("Contact form DB execute error: " . $stmt->error);
                }
                $stmt->close();
            } else {
                 $response['message'] = 'Database error preparing statement.';
                 error_log("Contact form DB prepare error: " . $conn->error);
            }
            $conn->close();
        } else {
             $response['message'] = 'Could not connect to the database.';
        }
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
exit;
?>