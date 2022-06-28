SELECT cohorts.name as cohort_name, count(students.*) as student_count
FROM cohorts
JOIN students ON cohort_id = cohorts.id
GROUP BY cohort_name
HAVING count(students.*) >= 18
ORDER BY student_count;


-- ERROR:  column "cohorts.name" must appear in the GROUP BY clause or be used in an aggregate function