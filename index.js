const express = require('express')
const app = express();
const dataResponse = require("./data.json")
var path = require("path")
const cors = require('cors');

app.use(cors())
app.use(express.static(path.join(__dirname, './active_person_react/build')))
app.get("/personsData", (req, res) => {
    res.json(dataResponse)
})
app.get("*", (req, res) => {
    res.send(express.static(path.join(__dirname, './active_person_react/build/index.html')))
})
const port = process.env.PORT || 5000;
app.listen(port)