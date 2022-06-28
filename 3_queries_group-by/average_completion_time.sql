SELECT students.name as student, AVG(assignment_submissions.duration) as average_assignment_duration
FROM students
JOIN assignment_submissions ON student_id = students.id
WHERE end_date is NULL --don't need students.end_date
GROUP BY student --don't need to use student students.name
ORDER BY average_assignment_duration DESC;