const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String
  },
  person: {
    type: String
  },
  priority: {
    type: String
  },
  initDate: {
    type: String
  },
  deadline: {
    type: String
  },
  desc: {
    type: String
  },
  isDoneDate: {
    type: Date
  },
  isDone: {
    type: Boolean
  },
})

module.exports = mongoose.model('Task', taskSchema)