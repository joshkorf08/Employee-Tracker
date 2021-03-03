DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    );
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    salary DECIMAL (6,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id),
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    
    FOREIGN KEY(role_id)
   
    REFERENCES role(id)
    
    FOREIGN KEY(manager_id)

    REFERENCES employee(id)

);

