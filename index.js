const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const departmentList = [];
const roleList = [];
const managerList = [];

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

const addEmployee = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    res.forEach((object) => {
      let role = {
        name: object.title,
        value: object.id,
      };
      roleList.push(role);
    });
  });

  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    res.forEach((object) => {
      let manager = {
        name: object.manager_id,
        value: object.manager_id,
      };
      managerList.push(manager);
    });
  });

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "first_Name",
      },
      {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "last_Name",
      },
      {
        type: "list",
        message: "What is the employee's position?",
        choices: roleList,
        name: "role_id",
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: managerList,
        name: "manager_id",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_Name,
          last_name: answers.last_Name,
          role_id: answers.role_id,
          manager_id: answers.manager,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
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
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    res.forEach((object) => {
      let department = {
        name: object.name,
        value: object.id,
      };
      departmentList.push(department);
    });
  });

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
        choices: departmentList,
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
