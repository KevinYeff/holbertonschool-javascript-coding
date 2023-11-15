#!/usr/bin/node

const request = require('request');
const URL = process.argv[2];
const fileToWrite = process.argv[3];
const fs = require('fs');

request.get(URL, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  fs.writeFile(fileToWrite, body, 'utf-8', (err) => {
    if (err) throw err;
  });
});
