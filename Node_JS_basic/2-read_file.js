const fs = require('fs');

module.exports = function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  //  console.log(path);
  const data = fs.readFileSync(path, 'utf-8').split('\n');
  const noTitleData = data.slice(1);
  console.log(`Number of students: ${noTitleData.length}`);
  // console.log(noTitleData);

  const fields = noTitleData.map((row) => row.split(',')[3]);
  // console.log(fields)
  const parsedFields = [...new Set(fields)];

  // console.log(parsedFields);
  // const csStudents = [];
  // const sweStudents = [];

  for (const field of parsedFields) {
    const student = noTitleData.filter((row) => row.endsWith(field)).map((row) => {
      const splitedLine = row.split(',');
      return splitedLine[0];
    });
    // console.log(student);
    console.log(`Number of students in ${field}: ${student.length}. List: ${student.join(', ')}`);

    // if (student[3] === parsedFields[0]) {
    //   csStudents.push(student[0]);
    // } else if (student[3] === parsedFields[1]) {
    //   sweStudents.push(student[0]);
    // }
    // console.log(student);
  }
  // console.log(csStudents.toString());
  // console.log(sweStudents);
};
