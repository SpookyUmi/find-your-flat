const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('yolo');

    console.log("REQUÊTE :", request.body);

    if (request.body.adverts) {
      request.body.adverts.forEach(flat => {
        let published = "";
        if (flat.published_at) {
          published = flat.published_at.replace(/T/g, ' ');
        }
        //Creating our "blocks" array
        let flatToRent = [
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*<${flat.url}|${flat.title}>* ~ ${flat.agency_name}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e/mois\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
            }
          },
        ];

        if (flat.others) {
          flat.others.assets.forEach(spec => {
            const others = {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `${spec}`
              }
            }
            flatToRent.push(others);
          })
        }

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

    } else if (request.body) {
      request.body.forEach(flat => {
        let published = "";
        if (flat.published_at) {
          published = flat.published_at.replace(/T/g, ' ');
        }
        //Creating our "blocks" array
        let flatToRent = [
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*<${flat.url}|${flat.title}>* ~ ${flat.agency_name}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e/mois\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
            }
          },
        ];

        if (flat.others) {
          flat.others.assets.forEach(spec => {
            const others = {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `${spec}`
              }
            }
            flatToRent.push(others);
          })
        }

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
