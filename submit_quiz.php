<?php
header('Content-Type: application/json');
require_once 'db_config.php';

$response = ['success' => false, 'message' => 'An error occurred saving results.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE); 

    $portfolioUser = trim($input['portfolioUser'] ?? 'Anonymous'); 
    $score = filter_var($input['score'] ?? null, FILTER_VALIDATE_INT);
    $totalQuestions = filter_var($input['total'] ?? null, FILTER_VALIDATE_INT);
    $correctCount = filter_var($input['correctCount'] ?? null, FILTER_VALIDATE_INT);
    $incorrectCount = filter_var($input['incorrectCount'] ?? null, FILTER_VALIDATE_INT);
    $timeTaken = filter_var($input['timeTaken'] ?? null, FILTER_VALIDATE_INT);

    if ($score === false || $totalQuestions === false || $correctCount === false || $incorrectCount === false) {
        $response['message'] = 'Invalid quiz result data received.';
    } else {
        $conn = createDbConnection();
        if ($conn) {
            $stmt = $conn->prepare("INSERT INTO quiz_results (portfolio_user, score, total_questions, correct_count, incorrect_count, time_taken_seconds) VALUES (?, ?, ?, ?, ?, ?)");

            if ($stmt) {
                $stmt->bind_param("siiiii", $portfolioUser, $score, $totalQuestions, $correctCount, $incorrectCount, $timeTaken);

                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Quiz results saved successfully!';
                } else {
                    $response['message'] = 'Error saving quiz results.';
                    error_log("Quiz results DB execute error: " . $stmt->error);
                }
                $stmt->close();
            } else {
                 $response['message'] = 'Database error preparing statement.';
                 error_log("Quiz results DB prepare error: " . $conn->error);
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