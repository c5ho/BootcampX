-- SELECT students.name, email, cohorts.name
-- FROM students JOIN cohorts ON cohort_id = cohorts.id;  
--no aliases here so table headings would be name/email/name

--for better formatting and understanding:
-- SELECT students.name as student_name, email, cohorts.name as cohort_name
-- FROM students JOIN cohorts ON cohort_id = cohorts.id;
--now headings will read student_name/email/cohort_name


-- SELECT students.name as student_name, email, cohorts.name as cohort_name
-- FROM students INNER JOIN cohorts ON cohorts.id = cohort_id;

--inner joins (both are the same)


-- Left outer join:
-- FROM students LEFT JOIN cohorts ON cohorts.id = cohort_id
-- All students and only cohorts that have students. students is the table to the left of the word LEFT.

-- Right outer join:
-- FROM students RIGHT JOIN cohorts ON cohorts.id = cohort_id
-- Only students that have a cohort_id and all cohorts. cohorts is the table to the right of the word RIGHT.

-- Full outer join:
-- FROM students FULL OUTER JOIN cohorts ON cohorts.id = cohort_id
-- All students and all cohorts.


-- Rollover students: when a student's start date is different than a cohort's start date

SELECT students.name as student_name, students.start_date as student_start_date, cohorts.name as cohort_name, cohorts.start_date as cohorts_start_date
FROM students 
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.start_date != students.start_date 
ORDER BY cohorts_start_date;




--Joining and grouping and having:

SELECT students.name as student, count(assignment_submissions.*) as total_submissions
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.end_date IS NULL
GROUP BY students.name
HAVING count(assignment_submissions.*) <100;

--cannot use HAVING total_submissions <100 because HAVING is evaluated before SELECT