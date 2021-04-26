const inquirer = require("inquirer");

const addDepartment = (connection, start) => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you want to add?",
        name: "name",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.name,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

module.exports = addDepartment;
