const express = require('express');
const router = express.Router();

const path = require('path');

//document 구조를 정의하는 스키마 설정
const Bill = require(path.resolve(__dirname, '../', 'models/bill'));

//특정 기업의 모든 bill 가져오기
router.get('/company/:id', (req, res) => {
  Bill.find({ companyID: req.params.id, isDeleted: 0 }, {})
    .sort({ date: 1 })
    .then(bills => res.json(bills))
    .catch(err => console.log(err))
});

//특정 계산서 정보 가져오기
router.get('/:id', (req, res) => {
  Bill.findOne({ _id: req.params.id })
    .then(bill => res.json(bill))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 });
    });
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
  bill.isDeleted = parseInt(req.body.isDeleted);

  bill.save()
    .then(() => res.json({ success: 1 }))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 })
    })
});

//계산서 수정하기
router.put('/:id', (req, res) => {
  Bill.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => res.json({ success: 1 }))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 })
    });
});

//계산서 삭제하기
router.delete('/:id', (req, res) => {
  Bill.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => res.json({ success: 1 }))
    .catch(err => {
      console.log(err);
      res.json({ fail: 1 })
    })
})


module.exports = router;