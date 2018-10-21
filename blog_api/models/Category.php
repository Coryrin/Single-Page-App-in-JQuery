<?php

    class Category {
        private $conn;
        private $table = 'categories';

        // Category properties
        public $id;
        public $name;
        public $created_at;

        // constructor with db
        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {
            $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at';

            // prepare statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();

            return $stmt;
        }
    }