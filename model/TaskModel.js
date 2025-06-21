const mongoose = require ("mongoose");

const TaskSchema = new mongoose.Schema({
    name:{
         type:String,
         required:true
    },
    taskname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    } 
},{timestamps:true})

module.exports = mongoose.model("task",TaskSchema,"tasks")