const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  price: { type: Object, default: {} },
  menuDisplay: { type: Object, default: { drink: [], food: [] } }
}, {
  versionKey: false
});

module.exports = mongoose.model('Company', companySchema);