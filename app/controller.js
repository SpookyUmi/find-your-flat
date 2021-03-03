const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('Body :', request.body);

    const flatToRent = request.body.adverts.map((flat) => (
      {
        "type": "section",
        "text": "hello"
      }
    ));

    axios.post(SLACK_URL,
      {
        "blocks": flatToRent
      }
    )
    response.send("everythink Ok");
  }
}

module.exports = controller;
