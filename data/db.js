const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: ,
  user: ,
  password: ,
  database: ,
  post: 
})


connection.connect((err)=>{
  if (err) throw err;
  console.log('Mysql è connesso!');
  
})

module.exports = connection;