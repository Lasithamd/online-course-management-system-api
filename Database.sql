CREATE DATABASE course_manage;
use  course_manage;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone int(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    app_password VARCHAR(255) NOT NULL
);

CREATE TABLE courses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE video(
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    thumbnails_path VARCHAR(255) NOT NULL,
    video_path VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE student_course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);


ALTER TABLE users ADD COLUMN name  VARCHAR(20);
ALTER TABLE users ADD COLUMN email  VARCHAR(30);
ALTER TABLE users DROP COLUMN username;
