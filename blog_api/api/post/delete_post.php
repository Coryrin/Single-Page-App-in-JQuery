<?php

    // headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, X-Requested-With');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    // instantiate db & connect
    $database = new Database();
    $db = $database->connect();

    // instantiate blog post object
    $post = new Post($db);

    // Get the raw posted data
    $data = json_decode(file_get_contents("php://input"));

    // Set ID to update
    $post->id = $data->id;

    // delete the post
    if($post->delete_post()) {
        echo json_encode(
            array('message' => 'Post Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'Post Not Deleted')
        );
    }