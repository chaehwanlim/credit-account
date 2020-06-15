const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
global.fetch = require('node-fetch');

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