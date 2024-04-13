const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/authroutes');
const Router = require('./routes/taskroutes')
const cors = require('cors')
app.use(express.json());
// const MySql = require('./database/dbmysql')

mongoose.connect('mongodb+srv://pawancallai:EndV5HE6QDjcIcyS@user-pro-db.khvmgc6.mongodb.net/?retryWrites=true&w=majority&appName=user-pro-db').then(() => {
    console.log('connected to mongodb')
}).catch(() => {
    console.log('No Connection')
});
// const task = require("./model/taskmodel")

app.use(cors());
app.use('/user',router);
app.use('/task',Router)

module.exports = app;