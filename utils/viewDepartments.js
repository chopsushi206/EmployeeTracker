const viewDepartments = (connection, start) => {
  console.log("\nComplete Department List:\n");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

module.exports = viewDepartments;
