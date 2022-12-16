const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const secret = "HELLOUSER"
const UserRoute = require('./routes/UserRoute')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const PostRoute = require('./routes/PostRoute')
const fileupload = require("express-fileupload")

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
app.use('/posts', (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        message: "Not a Valid Token"
                    })
                }
                req.user = decoded.data;
                next()
            })
        } else {
            return res.status(401).json({
                message: "Token Missing"
            })
        }

    } else {
        return res.status(403).json({
            message: "Not Authenticated User"
        })
    }
})

app.use("/" , UserRoute);
app.use("/", PostRoute)


module.exports = app