const { Pool } = require('pg');

//Optional connections config:
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const inputValues = [`%${cohort}`];
  
const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;
  `;

pool.query(queryString, inputValues)
.then(res => {
  //console.log(res.rows);
  const teachers = res.rows;
  for (const teacher of teachers) {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  }
  pool.end();
})

.catch(err => console.error('query error', err.stack));