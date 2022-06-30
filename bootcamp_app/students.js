const { Pool } = require('pg');

const pool = new Pool();

const cohort = process.argv[2];
const maxResult = process.argv[3];

//Optional connections config:
// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'bootcampx'
// });

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${cohort}%'
LIMIT ${maxResult};
`)
.then(res => {
  
  //console.log(res);  //entire response
  //console.log(res.rows);  //query response as an object

  const students = res.rows;
  for (const student of students) {
    console.log(`${student.name} has an id of ${student.student_id} and was in the ${student.cohort} cohort.`);
  }
  pool.end();
})
.catch(err => console.error('query error', err.stack));