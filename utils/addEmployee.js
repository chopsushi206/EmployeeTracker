const inquirer = require("inquirer");
const roleList = [];
const managerList = [];

const addEmployee = (connection, start) => {
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

module.exports = addEmployee;
