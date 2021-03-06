const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String },
  businessNumber: { type: String, default: '' },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  account: { type: Object, default: { bank: '', accountName: '', accountNumber: ''} },
  price: { type: Object, default: {} },
  menuDisplay: { type: Object, default: { drink: [], food: [] } }
}, {
  versionKey: false
});

module.exports = mongoose.model('company', companySchema, 'companies');