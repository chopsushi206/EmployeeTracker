const inquirer = require("inquirer");
const departmentList = [];

const addRole = (connection, start) => {
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

module.exports = addRole;
