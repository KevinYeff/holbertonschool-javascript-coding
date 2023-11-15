#!/usr/bin/node
const request = require('request');
const apiURL = process.argv[2];

request.get(apiURL, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  const usersAndTasks = JSON.parse(body);
  const taskCompletedObj = {};
  for (const obj of usersAndTasks) {
    //  console.log(obj.userId);
    //  console.log(obj);
    if (obj.userId && obj.completed === true) {
      //  console.log(obj);
      //  console.log(taskCompletedObj);
      if (!taskCompletedObj[obj.userId]) {
        taskCompletedObj[obj.userId] = 0;
      }
      taskCompletedObj[obj.userId]++;
    }
  }
  console.log(taskCompletedObj);
});
