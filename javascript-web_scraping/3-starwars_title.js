#!/usr/bin/node

const id = process.argv[2];
const apiURL = `https://swapi-api.hbtn.io/api/films/${id}`;
const request = require('request');

request.get(apiURL, (err, response) => {
  if (err) {
    console.log(err);
    return;
  }
  const data = response.toJSON();
  const title = JSON.parse(data.body);
  console.log(title.title);
});
