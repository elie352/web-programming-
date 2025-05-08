<?php
define('DB_HOST', 'localhost');      
define('DB_USER', 'your_db_username');
define('DB_PASS', 'your_db_password'); 
define('DB_NAME', 'your_db_name');      

function createDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        error_log("Database Connection failed: " . $conn->connect_error);
        return null;
    }
    $conn->set_charset("utf8mb4"); 
    return $conn;
}
?>