const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

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

const start = () => {};
inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "View Utilized Budget By Department",
      "Exit",
    ],
  })
  .then((answer) => {
    console.log(answer);
    switch (answer.action) {
      case "View All Employees":
        viewEmployees();
        break;

      case "View All Employees By Department":
        departmentView();
        break;

      case "View All Employees By Manager":
        teamView();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Update Employee Manager":
        updateManager();
        break;

      case "View All Roles":
        viewRoles();
        break;

      case "Update Employee Role":
        updateRole();
        break;

      case "View Utilized Budget By Department":
        viewDepartmentBudget();
        break;

      case "Exit":
        console.log("Thank you, Goodbye");
        connection.end();
        break;

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });

start();
