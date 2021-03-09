const axios = require('axios');
require('dotenv').config();

const SLACK_URL = process.env.SLACK_URL;
const SLACK_URL_MOM = process.env.SLACK_URL_MOM;

const controller = {
  index(_, response) {
    response.send('yolo');
  },

  slackHookSubmit(request, response, next) {
    console.log('yolo');

    console.log("REQUÊTE :", request.body.adverts, "---------");

    if (request.body.adverts) {
      request.body.adverts.forEach(flat => {
        let published = "";
        if (flat.published_at) {
          published = flat.published_at.replace(/T/g, ' ');
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
              "text": `*<${flat.url}|${flat.title}>* ~ ${flat.agency_name}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e/mois\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
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
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
      });
      // else if (request.body.adverts[0].ads_type === "buy") {
      //   request.body.adverts.forEach(flat => {
      //   let published = "";
      //   if (flat.published_at) {
      //     published = flat.published_at.replace(/T/g, ' ');
      //   }
      //   //Creating our "blocks" array
      //   let flatToBuy = [
      //     {
      //       "type": "divider"
      //     },
      //     {
      //       "type": "section",
      //       "text": {
      //         "type": "mrkdwn",
      //         "text": `*<${flat.url}|${flat.title}>* ~ ${flat.agency_name}\n*Type* :${flat.property_type}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
      //       }
      //     },
      //   ];

      //   if (flat.others && flat.others.assets) {
      //     flat.others.assets.forEach(spec => {
      //       const others = {
      //         "type": "section",
      //         "text": {
      //           "type": "mrkdwn",
      //           "text": `${spec}`
      //         }
      //       }
      //       flatToBuy.push(others);
      //     })
      //   }

      //   flat.images_url.forEach(url => {
      //     const images = {
      //       "type": "image",
      //       "image_url": url,
      //       "alt_text": "flat image"
      //     }
      //     flatToBuy.push(images);
      //   })

      //   axios.post(SLACK_URL_MOM,
      //     {
      //       "text": "Nouveaux logements à vendre !",
      //       "blocks": flatToBuy
      //     },
      //     {
      //       headers: { "Content-type": "application/json" }
      //     }
      //   )
      // });
      return response.send("It's an advert, cheers !");
    } return response.send("Not an advert, but it's ok");

  }
  // else if (request.body) {
  //   request.body.forEach(flat => {
  //     let published = "";
  //     if (flat.published_at) {
  //       published = flat.published_at.replace(/T/g, ' ');
  //     }
  //     //Creating our "blocks" array
  //     let flatToRent = [
  //       {
  //         "type": "divider"
  //       },
  //       {
  //         "type": "section",
  //         "text": {
  //           "type": "mrkdwn",
  //           "text": `*<${flat.url}|${flat.title}>* ~ ${flat.agency_name}\n${flat.area} mètres carrés, ${flat.bedrooms} chambres, ${flat.price} e/mois\n*Neuf* : ${flat.is_new}\n*Publié à* : ${published}\n*Description* : ${flat.description}`
  //         }
  //       },
  //     ];

  //     if (flat.others) {
  //       flat.others.assets.forEach(spec => {
  //         const others = {
  //           "type": "section",
  //           "text": {
  //             "type": "mrkdwn",
  //             "text": `${spec}`
  //           }
  //         }
  //         flatToRent.push(others);
  //       })
  //     }

  //     flat.images_url.forEach(url => {
  //       const images = {
  //         "type": "image",
  //         "image_url": url,
  //         "alt_text": "flat image"
  //       }
  //       flatToRent.push(images);
  //     })

  //     axios.post(SLACK_URL,
  //       {
  //         "text": "New flats incoming !",
  //         "blocks": flatToRent
  //       },
  //       {
  //         headers: { "Content-type": "application/json" }
  //       }
  //     )
  //   });
  //   return response.send("It's an advert, cheers !");

}

module.exports = controller;
