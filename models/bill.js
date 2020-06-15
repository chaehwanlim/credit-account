const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
  companyID: String,
  date: { type: Date, default: Date.now },
  people: Number,
  representative: String,
  order: Array,
  service: Array,
  memo: String,
  total: Number,
  isPaid: Number,
  isDeleted: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('bill', billSchema, 'bills');