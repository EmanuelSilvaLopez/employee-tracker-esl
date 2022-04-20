// List the dependencies here.
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
const util = require('util');
require('dotenv').config()

// Create the connection to MySQL WorkBench
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PW,
  database: 'company'
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
  if (err) throw err;
  prompt();
});

// First question that lists all options
const prompt = async () => {
  try {
    let answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employees',
        'Add Departments',
        'Add Roles',
        'Update Employee Role',
        'Exit'
      ]
    });
    switch (answer.action) {
      case 'View All Employees':
        viewAllEmployees();
        break;

      case 'View All Departments':
        viewAllDepartments();
        break;

      case 'View All Roles':
        viewAllRoles();
        break;

      case 'Add Employees':
        addEmployee();
        break

      case 'Add Departments':
        addDepartment();
        break

      case 'Add Roles':
        addRole();
        break

      case 'Update Employee Role':
        updateEmployeeRole();
        break

      case 'Exit':
        connection.end();
        break;
    };
  } catch (err) {
    console.log(err);
    prompt();
  };
};

// View all Employees
const viewAllEmployees = async () => {
  try {
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let employeeArray = [];
      res.forEach(employee => employeeArray.push(employee));
      console.table(employeeArray);
      prompt();
    });
  } catch (err) {
    console.log(err);
    prompt();
  };
};

// View all departments
const viewAllDepartments = async () => {
  try {
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let departmentArray = [];
      res.forEach(department => departmentArray.push(department));
      console.table(departmentArray);
      prompt();
    });
  } catch (err) {
    console.log(err);
    prompt();
  };
};

// View all roles
const viewAllRoles = async () => {

  try {
    let query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach(role => roleArray.push(role));
      console.table(roleArray);
      prompt();
    });
  } catch (err) {
    console.log(err);
    prompt();
  };
};

// Add an Employee
const addEmployee = async () => {
  try {

    let roles = await connection.query("SELECT * FROM role");

    let managers = await connection.query("SELECT * FROM employee");

    let answer = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of this Employee?'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of this Employee?'
      },
      {
        name: 'employeeRoleId',
        type: 'list',
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id
          }
        }),
        message: "What is this Employee's role id?"
      },
      {
        name: 'employeeManagerId',
        type: 'list',
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id
          }
        }),
        message: "What is this Employee's Manager's Id?"
      }
    ])

    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: (answer.employeeRoleId),
      manager_id: (answer.employeeManagerId)
    });

    console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
    prompt();

  } catch (err) {
    console.log(err);
    prompt();
  };
};

// Add a new Department
const addDepartment = async () => {
  try {

    let answer = await inquirer.prompt([
      {
        name: 'deptName',
        type: 'input',
        message: 'What is the name of your new department?'
      }
    ]);

    let result = await connection.query("INSERT INTO department SET ?", {
      department_name: answer.deptName
    });

    console.log(`${answer.deptName} added successfully to departments.\n`)
    prompt();

  } catch (err) {
    console.log(err);
    prompt();
  };
};

// Add a new Role
const addRole = async () => {
  try {

    let departments = await connection.query("SELECT * FROM department")

    let answer = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the name of your new role?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the estimated salary of this role?'
      },
      {
        name: 'departmentId',
        type: 'list',
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id
          }
        }),
        message: 'What department is this role in?',
      }
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === answer.choice) {
        chosenDepartment = departments[i];
      };
    }
    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId
    })

    console.log(`${answer.title} role added!\n`)
    prompt();

  } catch (err) {
    console.log(err);
    prompt();
  };
};

// Update role
const updateEmployeeRole = async () => {
  try {

    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id
          }
        }),
        message: 'Pick an employee to update.'
      }
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id
          }
        }),
        message: 'What role will this employee have?'
      }
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

    console.log(`The role was successfully updated.\n`);
    prompt();

  } catch (err) {
    console.log(err);
    prompt();
  };
};