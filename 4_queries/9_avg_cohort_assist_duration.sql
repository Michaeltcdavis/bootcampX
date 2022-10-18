SELECT AVG(cohort_durations.total_duration) AS average_total_duration
FROM (
SELECT  
cohorts.name, SUM(completed_at-started_at) AS total_duration
FROM students
JOIN assistance_requests ON students.id=assistance_requests.student_id
JOIN cohorts ON cohorts.id=students.cohort_id
GROUP BY cohorts.name
ORDER BY total_duration
) AS cohort_durations;


