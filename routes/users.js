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

const userSchema = new Schema({
  id: { type: String },
  password: { type: String },
  companyID: { type: String }
});

const User = mongoose.model('User', userSchema);

//로그인
router.post('/', (req, res) => {
  User.find({ id: req.body.id, password: req.body.password }, { 'name': 1, 'companyID': 1, '_id': 0 }, (err, user) => {
    if (err)
      console.log(err);
    else {
      res.send(user);
    }
  })
});

module.exports = router;