const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const app = express()

app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("Responding to request")
    res.send("Hello")
})

app.get("/user/:id", (req, res) => {
    console.log("Getting user id: " + req.params.id)

    const pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "Almazni2013",
        database: "Testing"
    })

    const queryString = "SELECT * FROM users WHERE id = ?"
    const userId = req.params.id

    pool.query(queryString, [userId], (error, rows, fields) => {

        if (error){
            console.log("Failed excuting Query. Error: " + error)
            res.sendStatus(500)
            res.end()
        }

        console.log("Fields: " + fields)

        const result = rows.map((row) => {
            return {
                firstName: row.first_name,
                lastName: row.last_name
            }
        })
        res.json(result)
    })
    // res.end()
})

app.get("/Users", (req, res) => {
    var user = {firstName: "Ahmed", lastName: "Ali"}
    res.json(user)
})

// Localhost:9090
app.listen(9090, () => {
    console.log("Server is listening on port 9090...")
})