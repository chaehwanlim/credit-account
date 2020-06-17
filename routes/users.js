const express = require('express');
const router = express.Router();

const path = require('path');

//document 구조를 정의하는 스키마 설정
const User = require(path.resolve(__dirname, '../', 'models/user'));
const Company = require(path.resolve(__dirname, '../', 'models/company'));

//로그인
router.post('/', (req, res) => {
  User.findOne({ id: req.body.id }, { '_id': 0 })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          res.json({
            "code": 200, 
            "alert": "로그인을 성공했습니다!", 
            "user": { name: user.name, companyID: user.companyID }
          });
        } else if (user.password !== req.body.password) {
          res.json({"code": 204, "alert": "패스워드가 올바르지 않습니다."});
        }
      } else {
        res.json({"code": 204, "alert": "존재하지 않는 아이디입니다."});
      }
    })
    .catch(err => res.json({"code" : 400, "alert": "로그인에 실패했습니다. 새로고침 해주세요."}));
});



//회원가입
router.post('/register', (req, res) => {
  const newUser = new User();
  newUser.id = req.body.id;
  newUser.password = req.body.password;
  newUser.name = req.body.name;

  User.find({ id: req.body.id }, { '_id': 0 })
    .then((user) => {
      if (user.length > 0) {
        res.json({"code": 204, "alert": "이미 존재하는 아이디입니다."})
      } else {  //company를 새로 등록한 뒤, 유저를 새로 등록함.
        const newCompany = new Company();
        newCompany.name = req.body.name;

        newCompany.save()
          .then((insertedCompany) => {
            newUser.companyID = insertedCompany._id;

            newUser.save()
              .then(() => {
                res.json({
                  "code": 200, 
                  "alert": "회원가입을 성공했습니다!", 
                  "user": { name: req.body.name, companyID: insertedCompany._id }
                });
              })
              .catch(err3 => res.json({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."}));
          })
          .catch(err2 => {
            console.log(error);
            res.json({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."});
          });
      }
    })
    .catch(err => res.json({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."}));
})

module.exports = router;