const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
  companyID: String,
  date: { type: Date, default: Date.now },
  people: { type: Number, default: 1 },
  representative: { type: String, default: '' },
  order: { type: Array, default: [] },
  service: { type: Array, default: [] },
  memo: { type: String, default: '' },
  total: { type: Number, default: 0 },
  isPaid: { type: Number, default: 0 },
  isDeleted: { type: Number, default: 0 }
}, {
  versionKey: false
});

module.exports = mongoose.model('bill', billSchema, 'bills');