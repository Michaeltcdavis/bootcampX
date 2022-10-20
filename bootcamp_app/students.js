const { Pool } = require('pg');
const input = process.argv.splice(2);
// input[1] = Number(input[1]);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE '%' || $1 || '%'
LIMIT ${input[1]? '$2' : 5};
`, input)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
    pool.end();
  }).catch(e => console.error('query error', e.stack));