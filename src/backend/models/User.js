const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String
  },
  surName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
})

module.exports = mongoose.model('User', userSchema)