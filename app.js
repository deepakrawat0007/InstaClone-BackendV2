const express = require("express");
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const UserRoute = require('./routes/UserRoute')

app.use("/" , UserRoute);


module.exports = app