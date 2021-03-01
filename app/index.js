const express = require('express');
const axios = require('axios');
const router = require('./router');

const app = express();
//const slackURL = 'https://hooks.slack.com/services/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';

console.log('salut');

// axios.post('https://hooks.slack.com/services/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', {
//   "text": "Hello"
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running, listening on port ${PORT}`);
});

//module.exports = app;
