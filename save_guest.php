<?php
header('Content-Type: application/json');

// Retrieve guest name and attendance status from the POST request.
$guestName = $_POST['guestName'] ?? '';
$attendance = $_POST['attendance'] ?? '';

// Prepare the response array.
$response = [
    'success' => false,
    'message' => 'An error occurred.'
];

// Check if the guest is attending and if a name was provided.
if ($attendance === 'yes' && !empty($guestName)) {
    // Define the file path.
    $file = 'guests.txt';
    // Create the log entry string with a timestamp.
    $logEntry = date('Y-m-d H:i:s') . " - Guest: " . $guestName . " - Attending: Yes\n";

    // Attempt to write the log entry to the file.
    // FILE_APPEND adds the content to the end of the file.
    // LOCK_EX prevents others from writing to the file at the same time.
    if (file_put_contents($file, $logEntry, FILE_APPEND | LOCK_EX) !== false) {
        $response['success'] = true;
        $response['message'] = 'Ваш ответ был записан.';
    } else {
        $response['message'] = 'Не удалось записать в файл.';
    }
} else if ($attendance === 'no') {
    // If the guest is not attending, we can just send a success message without saving to the file.
    $response['success'] = true;
    $response['message'] = 'Спасибо за Ваш ответ.';
} else {
    // Handle cases where no attendance is selected or the name is missing for 'yes' attendance.
    $response['success'] = false;
    $response['message'] = 'Пожалуйста, заполните все обязательные поля.';
}

// Encode the response array into a JSON string and send it.
echo json_encode($response);
?>
