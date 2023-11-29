const express = require('express');

const port = 1245;

const fs = require('fs');

const countStudents = require('./3-read_file_async');

const dataBaseFile = process.argv.length > 2 ? process.argv[2] : '';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  if (fs.existsSync(dataBaseFile)) {
    countStudents(dataBaseFile)
      .then((result) => {
        res.write(`This is the list of our students\nNumber of students: ${result.totalStudents}\n`);
        result.fields.forEach(({ field, count, list }) => {
          res.write(`Number of students in ${field}: ${count}. List: ${list}\n`);
        });
        res.end();
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;
