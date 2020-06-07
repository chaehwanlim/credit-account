const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const secret = fs.readFileSync(path.resolve(__dirname, '../', 'secret.json'));
const secretJSON = JSON.parse(secret);
const clientID = secretJSON.naver.clientID;
const clientSecret = secretJSON.naver.clientSecret;

router.get('/location/:keyword', (req, res) => {
  const request = require('request');
  const url = 'https://openapi.naver.com/v1/search/local';
  const query = {
    query: req.params.keyword
  }
  const options = {
    qs: query,
    url: url,
    headers: {
      'X-Naver-Client-Id': clientID, 'X-Naver-Client-Secret': clientSecret
    }
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`naver search error = ${response.statusCode}`);
    }
  });

});

module.exports = router;