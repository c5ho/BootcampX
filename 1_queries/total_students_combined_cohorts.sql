SELECT COUNT(id) 
FROM students
WHERE cohort_id <= 3;

--can also be WHERE cohort_id IN (1, 2, 3);



--\i 1_queries/total_students_combined_cohorts.sql