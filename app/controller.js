const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('yolo');

    if (request.body.adverts) {
      const flatToRent = request.body.adverts.map((flat) => (
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*<${flat.url}|${flat.title}>*\n${flat.agency_name}\n${flat.price} e/mois\n${flat.area} mètres carrés\n${flat.bedrooms} chambres\nneuf ? ${flat.is_new}`
          },
          "accessory": {
            "type": "image",
            "image_url": flat.images_url[0],
            "alt_text": "flat image"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": `Location: ${flat.city}`
            }
          ]
        },
        {
          "type": "divider"
        }
      ));

      axios.post(SLACK_URL,
        {
            "blocks": flatToRent
        },
        {
          headers: { "Content-type": "application/json" }
        }
      )

      return response.send("It's an advert, cheers !");

    } return response.send("Not an advert, but it's ok");
  }
}

module.exports = controller;
