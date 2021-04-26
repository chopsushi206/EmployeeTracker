const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
const {
  viewEmployees,
  viewDepartments,
  addEmployee,
  viewRoles,
  addRole,
  teamView,
  addDepartment,
  removeEmployee,
} = require("./utils");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Employees By Manager",
        "Add Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "View Utilized Budget By Department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees(connection, start);
          break;

        case "View All Departments":
          viewDepartments(connection, start);
          break;

        case "View All Employees By Manager":
          teamView(connection, start);
          break;

        case "Add Department":
          addDepartment(connection, start);
          break;

        case "Add Employee":
          addEmployee(connection, start);
          break;

        case "Remove Employee":
          removeEmployee(connection, start);
          break;

        case "Update Employee Manager":
          updateManager();
          break;

        case "View All Roles":
          viewRoles(connection, start);
          break;

        case "Add Role":
          addRole(connection, start);
          break;

        case "View Utilized Budget By Department":
          viewDepartmentBudget();
          break;

        case "Exit":
          console.log("\nThank you, Goodbye\n");
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
