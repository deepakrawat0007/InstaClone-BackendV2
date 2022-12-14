const express = require('express');
const app = require("./app");
const mongoose = require('mongoose');
const port = 3001;
const API = process.env.DATABASE_URL || "mongodb://localhost/InstaGram"

mongoose.set('strictQuery', false);

async function main() {

    mongoose.connect(API, () => {
        console.log("connected to database");
    })
    app.listen(port, () => { console.log(`Server is live at Port => ${port}`) })
}

main();