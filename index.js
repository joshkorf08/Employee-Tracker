const mysql = require('mysql');
const inquirer = require('inquirer');
const { repl } = require('repl');
const { prompt } = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Joshuakorf123456$',
    database: 'employee_db'
});


connection.connect((err) => {
    if (err) throw err;
    start();
});
const start = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What Do YOu Want To Do?",
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add a new Employee",
            "Update Employee Role",
        ]
    })
        .then(function (answer) {
            if (answer.choices === 'View all Departments') {
                viewDepartments();
            }
            else if (answer.choices === 'View all Roles') {
                viewRoles();
            }
            else if (answer.choices === 'View all Employees') {
                viewEmployees();
            }
            else if (answer.choices === 'Add a Department') {
                addDepartments();
            }
            else if (answer.choices === 'Add a Role') {
                addRole();
            }
            else if (answer.choices === 'Add a Employee') {
                addEmployees();
            }
            else if (answer.choices === 'update employee role') {
                updateRole();
            }
        })
}

function viewEmployees() {
    const query = "SELECT * FROM employee" ;
    connection.query(query, function (err, res) {
        console.log(`EMPLOYEE:`)
        res.forEach(role => {
            console.table(`ID: ${role.id}, Title: ${role.title}, Salary: ${role.salary},  Department ID: ${role.department_id}`);
        })
        start();
    });
};

function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log(`DEPARTMENTS:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
    });
};

function viewEmployees() {
    const query = `SELECT employee.id, employee.frist_name, employee.last_name, role.title, department.name, role.slaray CONCAT(manager.first_name, manager.last_name)
    FROM employee
    LEFT JOIN employee manager on manager.id = employee_id
    INNER JOIN role ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('works')
        console.log('\n');
        console.table(res);
        prompt();
    });
    
}

function viewByDepartments() {
    const query = `SELEct department.name AS department, role.title, employee.id, employee.first_name, employee.last_name FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    ORDER BY department.name`;
    coneection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        prompt();
    });
}



