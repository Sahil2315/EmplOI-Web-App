const express = require('express')
const app = express()
const path = require('path')
const { Pool, Client } = require('pg')
const connectionString = 'postgres://umwbhcmq:HIOtH0VI2Vqr6kzqsR4X3tjxzlOf_nqz@surus.db.elephantsql.com/umwbhcmq'

const db = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }

})

db.connect((err) => {
  if (err) throw err
  console.log("Connected")
})

app.use(express.static(path.join(__dirname + '/Admin/')));
app.use(express.static(path.join(__dirname + '/css/')));
app.use(express.static(path.join(__dirname + '/Details/')));
app.use(express.static(path.join(__dirname + '/SignIn/')));
app.use(express.static(path.join(__dirname + '/SignUP/')));
app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'SignIn/index.html'))
})

app.post('/signup', (req, res) => {
    db.query(`select email,title from employee where empid = '${req.body.empid}' and regkey = '${req.body.regkey}' and regport = 'no';`, (err, result) => {
        if (result.rows.length == 0) {
            res.send({ "reg": "failure" })
        }
        else {
            res.send({ "reg": "success" })
            if (result.rows[0].title == 'Admin') {
                db.query(`insert into logindet values('${req.body.empid}', '${req.body.username}', '${result.rows[0].email}', '${req.body.password}', 'yes');`)
                db.query(`update employee set regport = "yes" where empid = "${req.body.empid}"`)
            }
            else {
                db.query(`insert into logindet values('${req.body.empid}', '${req.body.username}', '${result.rows[0].email}', '${req.body.password}', 'no');`)
                db.query(`update employee set regport = 'yes' where empid = '${req.body.empid}'`)
            }
        }
    })
})

admin = false

auth = false

app.post('/login', (req, res) => {
    db.query(`select * from logindet where username = '${req.body.username}' and password = '${req.body.password}';`, function (err, result) {
        if(err) throw err
        if (result.rows.length == 0) {
            res.send({ "login": "failure" })
        }
        else {
            if (result.rows[0].admin == "yes") {
                res.send({
                    "login": "successful",
                    "admin": "yes"
                })
                admin = true
            }
            else {
                res.send({
                    "login": "successful",
                    "admin": "no"
                })
                auth = true
            }
        }
    })
})

app.post('/extract', (req, res) => {
    db.query(`select * from logindet where  username = '${req.body.user}' and password = '${req.body.pass}';`, function (err, result) {
        db.query(`select * from employee where empid = '${result.rows[0].empid}';`, function (er, reslt) {
            console.log(err)
            res.send({
                "empid": reslt.rows[0].empid,
                "Gdet":{
                    "Full Name": reslt.rows[0].name,
                    "Gender": reslt.rows[0].gender,
                    "Date Of Birth": `${reslt.rows[0].dob.getDate()}-${reslt.rows[0].dob.getMonth()}-${reslt.rows[0].dob.getFullYear()}`,
                    "Email ID": reslt.rows[0].email
                },
                "Pdet":
                {
                    "Phone Number": reslt.rows[0].phone,
                    "Current Address": reslt.rows[0].c_add,
                    "Permanent Address": reslt.rows[0].p_add,
                    "Aadhaar Card No.": reslt.rows[0].aadhaar,
                    "UPI ID": reslt.rows[0].upi
                },
                "Odet": {
                    "Department": reslt.rows[0].dept,
                    "Job Title": reslt.rows[0].title,
                    "Joining Date": `${reslt.rows[0].doj.getDate()}-${reslt.rows[0].doj.getMonth()}-${reslt.rows[0].doj.getFullYear()}`,
                    "Salary": reslt.rows[0].salary,
                    "Registration Key": reslt.rows[0].regkey,
                    "Laptop ID": reslt.rows[0].laptop,
                    "Leaves Remaining": reslt.rows[0].leaves
                }
        })
    })
})
})

app.get('/emplogin', (req, res) => {
    if (auth) {
        res.sendFile(path.join(__dirname, "Details/Details.html"))
        auth = false
    }
    else {
        res.send({ "extract": "failure" })
    }
})

app.get('/adminlogin', (req, res) => {
    if (admin) {
        res.sendFile(path.join(__dirname, "Admin/Admin.html"))
        admin = false
    }
    else {
        res.send({ "admext": failure })
    }
})

app.get('/admext', (req, res) => {
    db.query('select * from employee;', (err, result) => {
        res.send({ "body": result.rows})
    })
})

app.listen(5000, () => {
    console.log("Server Running on Port 5000")
})