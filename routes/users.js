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
const User = require(path.resolve(__dirname, '../', 'models/user'));
const Company = require(path.resolve(__dirname, '../', 'models/company'));

//로그인
router.post('/', (req, res) => {
  User.findOne({ 
    id: req.body.id 
  }, { 
    '_id': 0 
  }, (err, user) => {
    if (err)
      res.send({"code" : 400, "alert": "로그인에 실패했습니다. 새로고침 해주세요."});
    else {
      if (user) {
        if (user.password === req.body.password) {
          res.send({
            "code": 200, 
            "alert": "로그인을 성공했습니다!", 
            "user": { name: user.name, companyID: user.companyID }
          });
        } else if (user.password !== req.body.password) {
          res.send({"code": 204, "alert": "패스워드가 올바르지 않습니다."});
        }
      } else {
        res.send({"code": 204, "alert": "존재하지 않는 아이디입니다."});
      }
    }
  })
});

//회원가입
router.post('/register', (req, res) => {
  const newUser = new User();
  newUser.id = req.body.id;
  newUser.password = req.body.password;
  newUser.name = req.body.name;
  
  User.find({
    id: req.body.id
  }, {
    '_id': 0
  }, (err, user) => {
    if (err)
      res.send({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."});
    else {
      if (user.length > 0) {
        res.send({"code": 204, "alert": "이미 존재하는 아이디입니다."})
      } else {  //company를 새로 등록한 뒤, 유저를 새로 등록함.
        const newCompany = new Company();
        newCompany.name = req.body.name;

        newCompany.save((error, insertedCompany) => {
          if (error) {
            console.log(error);
            res.send({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."});
          } else {  //이제 윳저를 새로 등록
            newUser.companyID = insertedCompany._id;

            newUser.save((error2) => {
              if (error2) {
                res.send({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."});
              } else {  //유저 등록 성공 -> company 생성
                res.send({
                  "code" : 200, 
                  "alert": "회원가입을 성공했습니다!", 
                  "user": { name: req.body.name, companyID: insertedCompany._id }
                });
              }
            })
          }
        })
      }
    }
  })
})

module.exports = router;