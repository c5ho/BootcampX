const { Pool } = require('pg');

//Optional connections config:
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const maxResult = process.argv[3];
const inputValues = [`%${cohort}%`, maxResult];

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

pool.query(queryString, inputValues)
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