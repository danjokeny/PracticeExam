//Database require
var mongoose = require('mongoose');


//Database Schema
var Schema = mongoose.Schema;
var priorityValid=['Critical', 'High', 'Medium', 'Low']
var TodoSchema = new Schema({
  Todo: { type: String, require:true },
  Priority: {type:String, enum: priorityValid},
  DateDue: { type: Date, default: Date.now }
});


//Database Connection
module.exports =
  mongoose.model('Todo', TodoSchema);