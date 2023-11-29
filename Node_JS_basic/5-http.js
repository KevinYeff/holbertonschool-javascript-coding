const http = require('http');

const hostname = '127.0.0.1';
const port = 1245;

const countStudents = require('./3-read_file_async');

const dataBaseFile = process.argv.length > 2 ? process.argv[2] : '';

const app = http.createServer((req, res) => {
  const { url } = req;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (url === '/') {
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    res.write('This is the list of our students');
    countStudents(dataBaseFile)
      .then((result) => {
        res.write(`Number of students ${result.totalStudents}\n`);
        // console.log(result.fields);
        result.fields.forEach(({ field, count, list }) => {
          res.write(`Number of students in ${field}: ${count}. List: ${list}`);
        });
        res.end();
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(error.message);
      });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;
