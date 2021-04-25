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
        "Add Employee",
        "Remove Employee",
        "Add Role",
        "Update Employee Manager",
        "View All Roles",
        "View Utilized Budget By Department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Departments":
          viewDepartments();
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

        case "Add Role":
          addRole();
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
};

const viewEmployees = () => {
  console.log("\nComplete Employee List:\n");
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewDepartments = () => {
  console.log("\nComplete Department List:\n");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const teamView = () => {
  console.log("\nComplete Employee List By Manager:\n");
  connection.query("SELECT * FROM employee WHERE manager_id", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  console.log("\nComplete Role List:\n");
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role you would like to add?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the role salary?",
        name: "salary",
      },
      {
        type: "list",
        message: "What is the department?",
        choices: [connection.query("SELECT * FROM department")],
        name: "department_id",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};
