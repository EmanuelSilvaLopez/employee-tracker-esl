const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "process.env.DB_PW",
  database: "company"
});


function prompt() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        promptMessages.viewAllEmployees,
        promptMessages.viewAllDepartments,
        promptMessages.viewAllRoles,
        promptMessages.addEmployee,
        promptMessages.updateEmployeeRole,
        promptMessages.addDepartment,
        promptMessages.addRole,
        promptMessages.exit
      ]
    })
    .then(answer => {
      console.log('answer', answer);
      switch (answer.action) {
        case promptMessages.viewAllEmployees:
          viewAllEmployees();
          break;

        case promptMessages.viewAllDepartments:
          viewAllDepartments();
          break;

        case promptMessages.viewAllRoles:
          viewAllRoles();
          break;

        case promptMessages.addEmployee:
          addEmployee();
          break;

        case promptMessages.updateEmployeeRole:
          updateEmployeeRole();
          break;

        case promptMessages.addRole:
          addRole();
          break;

        case promptMessages.addDepartment:
          addDepartment();
          break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}