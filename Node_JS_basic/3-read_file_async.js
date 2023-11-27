const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const noTitleData = data.split('\n').slice(1);
      const parsedFields = [...new Set(noTitleData.map((row) => row.split(',')[3]))];

      const result = {
        totalStudents: noTitleData.length,
        fields: parsedFields.map((field) => {
          const students = noTitleData
            .filter((row) => row.trim())
            .filter((row) => row.endsWith(field))
            .map((row) => row.split(',')[0]);
          return {
            field,
            count: students.length,
            list: students.join(', '),
          };
        }),
      };

      console.log(`Number of students: ${result.totalStudents}`);
      result.fields.forEach(({ field, count, list }) => {
        console.log(`Number of students in ${field}: ${count}. List: ${list}`);
      });

      resolve(result);
    });
  });
}

module.exports = countStudents;
