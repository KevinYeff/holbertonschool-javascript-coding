#!/usr/bin/node

const id = '18';
const apiURL = process.argv[2];
const request = require('request');

request.get(apiURL, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  const data = JSON.parse(body).results;
  //  console.log(data);
  let count = 0;
  for (const content of data) {
    //  console.log(content);
    for (const character of content.characters) {
      if (character.includes(id)) {
        // console.log(character);
        count++;
        // console.log(count);
      }
    //  console.log(character);
    }
  }
  console.log(count);
});
