const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('Body :', request.body);

    if (request.body.adverts) {
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

        response.send("It's an advert, cheers !");

    } response.send("Not an advert, but it's ok");
  }
}

module.exports = controller;
