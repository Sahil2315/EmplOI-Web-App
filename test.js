// const mysql = require('mysql2')

// db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '153Sahil*',
//     database: 'EmpLUI'
// })

// db.connect(function(err) {
//     if (err) throw err;
// });

// db.query(`select * from employee;`, function(err, result){
//     // console.log(err)
//     console.log(result)
// })

const { Pool, Client } = require('pg')
const connectionString = 'postgres://umwbhcmq:HIOtH0VI2Vqr6kzqsR4X3tjxzlOf_nqz@surus.db.elephantsql.com/umwbhcmq'

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }

})

client.connect((err) => {
  if (err) throw err
  console.log("Connected")
})

client.query(`SELECT * FROM employee where empid = 'awdawf'`, (err, res) => {
  console.log('Students:', res.rows.length, '\n')
  console.log(res.rows)
  // console.log(res.rows.length)
})

// client.query('SELECT * FROM admins', (err, res) => {
//   console.log('Admins:', res.rows.length, '\n')
//   console.log(res.rows)
//   // console.log(res.rows.length)
// })

