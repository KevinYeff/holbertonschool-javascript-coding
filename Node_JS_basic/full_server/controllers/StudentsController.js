import countStudents from '../utils';

class StudentsController {
  static getAllStudents(_req, res) {
    res.status(200);
    countStudents(process.argv[2])
      .then((result) => {
        res.write('This is the list of our students\n');

        result.fields.forEach(({ field, count, list }) => {
          res.write(`Number of students in ${field}: ${count}. List: ${list}\n`);
        });
      })
      .catch((error) => {
        res.write(error.message);
      })
      .finally(() => {
        res.end();
      });
  }

  static getAllStudentsByMajor(req, res) {
    res.status(200);
    countStudents(process.argv[2])
      .then((result) => {
        const { major } = req.params;
        const fieldData = result.fields.find((field) => field.field === major);

        if (fieldData) {
          res.write(`List: ${fieldData.list}`);
        } else {
          res.status(500);
          res.write('Major parameter must be CS or SWE');
        }
      })
      .catch((error) => {
        res.write(error.message);
      })
      .finally(() => {
        res.end();
      });
  }
}

module.exports = StudentsController;
