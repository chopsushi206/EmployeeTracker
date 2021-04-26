const viewRoles = (connection, start) => {
  console.log("\nComplete Role List:\n");
  connection.query(
    "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

module.exports = viewRoles;
