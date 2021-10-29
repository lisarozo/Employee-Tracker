const mysql = require('mysql2');


// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'Themoon01',
      database: 'employees'
    },
    console.log(`Connected to the inventory_db database.`)
  );

  connection.connect(function(err){
      if (err) throw err;
  })

  module.exports = connection;
  