const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

const dbKeyFile = fs.readFileSync(path.resolve(__dirname, '../', 'secret.json'));
const dbKey = JSON.parse(dbKeyFile);

//BodyParser 설정
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//MongoDB 설정
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbKey.mongoDB.string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.log(err));

//document 구조를 정의하는 스키마 설정
const Schema = mongoose.Schema;

const billSchema = new Schema({
  companyID: String,
  date: String,
  people: Number,
  representative: String,
  order: Array,
  service: Array,
  memo: String,
  total: Number,
  isPaid: Number
});

const Bill = mongoose.model('Bill', billSchema);

//특정 기업의 모든 bill 가져오기
router.get('/company/:id', (req, res) => {
  Bill.find({ companyID: req.params.id }, (err, bills) => {
    if (err)
      console.log(err);
    else {
      res.json(bills);
    }
  })
});

//계산서 추가하기
router.post('/', (req, res) => {
  const bill = new Bill();
  bill.companyID = req.body.companyID;
  bill.date = req.body.date;
  bill.people = parseInt(req.body.people);
  bill.representative = req.body.representative;
  bill.order = req.body.order;
  bill.service = req.body.service;
  bill.memo = req.body.memo;
  bill.total = parseInt(req.body.total);
  bill.isPaid = parseInt(req.body.isPaid);

  bill.save((err) => {
    if (err)
      console.log(err)
    else {
      res.json({ success: 1 });
    }
  })
});

//계산서 수정하기
router.put('/:id', (req, res) => {
  Bill.update({ _id: req.params.id }, { $set: req.body }, (err, output) => {
    if (err)
      console.log(err)
    else {
      res.json({ success: 1 });
    }
  })
});

//계산서 삭제하기
router.delete('/:id', (req, res) => {
  Bill.remove({ _id: req.params.id }, (err, output) => {
    if (err)
      console.log(err)
    else {
      res.json({ success: 1 });
    }
  })
})


module.exports = router;