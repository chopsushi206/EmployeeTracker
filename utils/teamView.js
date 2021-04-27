const teamView = (connection, start) => {
  console.log("\nComplete Employee List By Manager:\n");
  connection.query("SELECT * FROM employee WHERE manager_id ?", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

module.exports = teamView;
