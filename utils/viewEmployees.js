const viewEmployees = (connection, start) => {
  console.log("\nComplete Employee List:\n");
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, 
      roles.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) 
      AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id 
      LEFT JOIN department ON roles.department_id = department.id LEFT JOIN 
      employee manager ON manager.id = employee.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

module.exports = viewEmployees;
