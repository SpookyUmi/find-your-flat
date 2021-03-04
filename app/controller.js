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
      request.body.adverts.forEach(flat => {
        const flatToRent = [
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*<${flat.url}|${flat.title}>*\n${flat.agency_name}\n${flat.price} e/mois\n${flat.area} mètres carrés\n${flat.bedrooms} chambres\nneuf ? ${flat.is_new}`
            }
          },
        ]

        flat.images_url.forEach(url => {
          const images = {
            "type": "image",
            "image_url": url,
            "alt_text": "flat image"
          }
          flatToRent.push(images);
        })

        axios.post(SLACK_URL,
          {
              "text": "New flats incoming !",
              "blocks": flatToRent
          },
          {
            headers: { "Content-type": "application/json" }
          }
        )
      });


      return response.send("It's an advert, cheers !");

    } return response.send("Not an advert, but it's ok");
  }
}

module.exports = controller;
