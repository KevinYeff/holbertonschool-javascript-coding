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
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;
