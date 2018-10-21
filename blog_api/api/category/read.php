<?php

    // headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Category.php';

    // instantiate db & connect
    $database = new Database();
    $db = $database->connect();

    // instantiate blog post object
    $category = new Category($db);

    $result = $category->read();
    // get row count
    $num = $result->rowCount();

    if($num > 0) {
        $category_arr = array();
        $category_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $category_item = array(
                'id' => $id,
                'name' => $name
            );

            // push to "data"
            array_push($category_arr['data'], $category_item);
        }

        // Turn to json & output
        echo json_encode($category_arr);

    } else {
        // no posts
        echo json_encode(
            array('message' => 'No posts found')
        );
    }

    