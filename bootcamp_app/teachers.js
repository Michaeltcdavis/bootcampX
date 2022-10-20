const { Pool } = require('pg');
const input = process.argv.splice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT 
DISTINCT teachers.name AS teacher,
cohorts.name AS cohort,
COUNT(assistance_requests) AS total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id=teachers.id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE '%' || $1 || '%'
GROUP BY teacher, cohort
ORDER BY teacher;
`, input)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
    pool.end();
  }).catch(e => console.error('query error: ', e.stack));

