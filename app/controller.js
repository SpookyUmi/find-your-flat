const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('Body :', request.body);

    const hello = request.body;

    axios.post(SLACK_URL,
      hello
    )
    response.send(hello);
  }
}

module.exports = controller;
