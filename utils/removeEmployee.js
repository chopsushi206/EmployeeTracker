const inquirer = require("inquirer");
const employeeList = [];

const removeEmployee = (connection, start) => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    res.forEach((object) => {
      let employee = {
        name: object.first_name + object.last_name,
        value: object.id,
      };
      employeeList.push(employee);
      console.log(employeeList);
    });
  });

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employeeList,
        name: "choice",
      },
    ])
    .then((answers) => {
      connection.query(
        "DELETE FROM employee SET ?",
        {
          id: answers.choice,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

module.exports = removeEmployee;
