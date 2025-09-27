<?php
$allowed_origin = "https://www.daniel-tran.com";

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: $allowed_origin");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        exit(0);

    case "POST":
        header("Access-Control-Allow-Origin: $allowed_origin");

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'postmaster@daniel-tran.com';
        $subject = "Contact From <$email>";
        $message = "From: " . $name . "<br>" . $message;

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: noreply@mywebsite.com";

        mail($recipient, $subject, $message, implode("\r\n", $headers));
        echo json_encode(["status" => "success"]);
        break;

    default:
        header("Allow: POST", true, 405);
        exit;
}
