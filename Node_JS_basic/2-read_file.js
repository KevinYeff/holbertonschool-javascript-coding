const fs = require('fs');

module.exports = function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  const data = fs.readFileSync(path, 'utf-8').split('\n');
  const noTitleData = data.slice(1);
  console.log(`Number of students: ${noTitleData.length}`);

  const fields = noTitleData.map((row) => row.split(',')[3]);
  const parsedFields = [...new Set(fields)];

  for (const field of parsedFields) {
    const student = noTitleData
      .filter((row) => row.trim())
      .filter((row) => row.endsWith(field))
      .map((row) => {
        const splitedLine = row.split(',');
        return splitedLine[0];
      });
    console.log(`Number of students in ${field}: ${student.length}. List: ${student.join(', ')}`);
  }
};
