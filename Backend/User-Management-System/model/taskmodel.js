const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
        
    },
    employee: {
        type: String,
        required: true,
    },
    assign: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    } 
});

const taskModel = mongoose.model('mycollection', taskSchema);

module.exports = taskModel;