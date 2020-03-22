const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("Responding to request")
    res.send("Hello")
})

app.get("/Users", (req, res) => {
    var user = {firstName: "Ahmed", lastName: "Ali"}
    res.json(user)
})

// Localhost:9090
app.listen(9090, () => {
    console.log("Server is listening on port 9090...")
})