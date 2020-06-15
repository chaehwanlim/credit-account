const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String },
  password: { type: String },
  name: { type: String },
  companyID: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('user', userSchema, 'users');