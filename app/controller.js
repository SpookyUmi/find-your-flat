const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;
const SLACK_URL_MOM = process.env.SLACK_URL_MOM;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit: async (request, response, next) => {
    console.log("REQUÊTE :", request.body.adverts, "---------");
    try {
      if (request.body.adverts) {
        const receivedFlats = await request.body.adverts.forEach(flat => {
          let published = "";
          if (flat.published_at) {
            published = flat.published_at.replace(/T/g, ' ');
          }
          let title = "";
          if (flat.title.includes(`\t\t\t\t\t`)) {
            title = flat.title.replace(/\t\t\t\t\t/g, ' ').replace(/\r\n/g, ' ');
          }
          //Creating our "blocks" array
          let flatToCheck = [
            {
              "type": "divider"
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `*<${flat.url}|${title.trim()}>* ~ ${flat.agency_name}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e/mois\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
              }
            },
          ];

          if (flat.others && flat.others.assets) {
            flat.others.assets.forEach(spec => {
              const others = {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": `${spec}`
                }
              }
              flatToCheck.push(others);
            })
          }

          flat.images_url.forEach(url => {
            const images = {
              "type": "image",
              "image_url": url,
              "alt_text": "flat image"
            }
            flatToCheck.push(images);
          })
          axios.post(flat.ads_type === "buy" ? SLACK_URL_MOM : SLACK_URL,
          {
            "text": "New flats !",
            "blocks": flatToCheck
          },
          {
            headers: { "Content-type": "application/json" }
          }
          )
          .then(response => {
            console.log(response.status);
          })
          .catch(error => {
            console.log(error);
          })
        });
        console.log(receivedFlats);
        return response.send("It's an advert, cheers !");
      } return response.send("Not an advert, but it's ok");

    } catch (error) {
      console.log(error);
      request.body.adverts.forEach((flat) => {
        axios.post(flat.ads_type === "buy" ? SLACK_URL_MOM : SLACK_URL,
          {
            "text": "Une erreur est survenue",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "plain_text",
                  "text": `Une erreur est survenue : ${error}`,
                  "emoji": true
                }
              }
            ]
          },
          {
            headers: { "Content-type": "application/json" }
          }
        )
          .then(response => {
            console.log(response.status);
          })
          .catch(error => {
            console.log(error);
          })
      })
    }

  }

}

module.exports = controller;
