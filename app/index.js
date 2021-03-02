const express = require('express');
const axios = require('axios');
const router = require('./router');

const app = express();

console.log('salut');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running, listening on port ${PORT}`);
});

//module.exports = app;
