
SELECT name,
FROM users
WHERE user_id = $1;

UPDATE users
SET profile_picture = $1
WHERE user_id = $2;

SELECT name
FROM teams
WHERE team_id = $1;

UPDATE teams
SET NAME = $1
where team_id = $2;

UPDATE teams
SET DESCRiPTION = $1
where team_id = $2;

SELECT title
FROM tasks
WHERE task_id = $1;

UPDATE tasks
SET deadline = $1
where task_id = $2;

UPDATE tasks
SET title = $1
where task_id = $2;

UPDATE taskss
SET desription = $1
where task_id = $2;

UPDATE tasks
SET attachment = $1
where task_id = $2;

SELECT task_id, team_id
FROM submissions
WHERE submission_id = $1;

DELETE submissions
WHERE task_id = $1;

UPDATE submissions
SET submission_string = $1
WHERE submission_id = $2;

UPDATE submissions
SET remark = $1
WHERE submission_id = $2;

DELETE submissions
WHERE submission_id = $1;

SELECT user_id, team_id
FROM user_teams;


SELECT team_id,team_name,creator_id,creator_name, json_agg(json_build_object('user_id', user_id,'full_name', full_name, 'email', email)) AS team_members
FROM user_teams NATURAL JOIN
(SELECT team_id, team_name, creator_id, full_name AS creator_name
FROM teams, users
WHERE creator_id = user_id) AS temp_tab1 NATURAL JOIN users
WHERE creator_id != user_id
GROUP BY team_id, team_name,creator_id,creator_name;