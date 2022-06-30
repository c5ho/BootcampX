const { Pool } = require('pg');

//const pool = new Pool();

const cohort = process.argv[2];

//Optional connections config:
const pool = new Pool({
  // user: 'vagrant',
  // password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${cohort}'
ORDER BY teacher;
`)
.then(res => {

  console.log(res.rows);
  const teachers = res.rows;
  for (const teacher of teachers) {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  }
  pool.end();
})
.catch(err => console.error('query error', err.stack));