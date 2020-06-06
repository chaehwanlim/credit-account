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

const companySchema = new Schema({
  name: { type: String },
  location: { type: String },
  phone: { type: String },
  price: { type: Object },
  menuDisplay: { type: Object }
}, {
  versionKey: false
});

const Company = mongoose.model('Company', companySchema);

//특정 기업의 정보 가져오기
router.get('/:id', (req, res) => {
  Company.find({ _id: req.params.id }, (err, info) => {
    if (err)
      console.log(err);
    else {
      res.json(info);
    }
  })
})

//기업 정보 새로 추가
router.post('/', (req, res) => {
  const company = new Company();
  company.name = req.body.name;
  company.location = req.body.location;
  company.phone = req.body.phone;
  company.price = req.body.price;
  company.menuDisplay = req.body.menuDisplay;

  company.save((err) => {
    if (err)
      console.log(err);
    else {
      res.json({ success: 1 });
    }
  })
});

//기업정보 수정
router.put('/:id', (req, res) => {
  Bill.update({ _id: req.params.id }, { $set: req.body }, (err, output) => {
    if (err)
      console.log(err);
    else {
      res.json({ success: 1 });
    }
  })
});

//삭제기능은 아직 구현하지 말자.


module.exports = router;