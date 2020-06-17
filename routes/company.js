const express = require('express');
const router = express.Router();

const path = require('path');

//document 구조를 정의하는 스키마 설정
const Company = require(path.resolve(__dirname, '../', 'models/company'));

//특정 기업의 정보 가져오기
router.get('/:id', (req, res) => {
  Company.find({ _id: req.params.id })
    .then(info => res.json(info))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 });
    });
})

//기업 정보 새로 추가
router.post('/', (req, res) => {
  const company = new Company();
  company.name = req.body.name;
  company.businessNumber = req.body.businessNumber;
  company.location = req.body.location;
  company.phone = req.body.phone;
  company.account = req.body.account;
  company.price = req.body.price;
  company.menuDisplay = req.body.menuDisplay;

  company.save()
    .then(() => res.json({ success: 1 }))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 })
    });
});

//기업정보 수정
router.put('/:id', (req, res) => {
  Company.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => res.json({ success: 1 }))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 });
    });
});

//삭제기능은 아직 구현하지 말자.


module.exports = router;