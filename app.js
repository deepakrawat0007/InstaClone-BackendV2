const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const secret = "HELLOUSER"
const UserRoute = require('./routes/UserRoute')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const PostRoute = require('./routes/PostRoute')
const fileupload = require("express-fileupload")
const Authentication = require("./middleware/autherization")
const AccountRoute = require("./routes/AccountRoute")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use(fileupload({
    useTempFiles : true
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


app.use("/" , UserRoute);
app.use("/",Authentication ,PostRoute)
app.use("/", Authentication , AccountRoute)


module.exports = app