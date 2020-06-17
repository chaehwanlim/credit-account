const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
global.fetch = require('node-fetch');

const path = require('path');
const fs = require('fs');

const dbKeyFile = fs.readFileSync(path.resolve(__dirname, './', 'secret.json'));
const dbKey = JSON.parse(dbKeyFile);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbKey.mongoDB.string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.log(err));

  //BodyParser 설정
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const companyRouter = require('./routes/company');
const billsRouter = require('./routes/bills');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');

app.use('/api/company', companyRouter);
app.use('/api/bills', billsRouter);
app.use('/api/users', usersRouter);
app.use('/api/search', searchRouter);



app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})