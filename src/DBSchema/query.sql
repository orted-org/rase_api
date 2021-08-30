
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
















-- joining team trigger
DROP TRIGGER IF EXISTS limit_team_size ON user_teams;
CREATE OR REPLACE function limit_team_size_func() returns trigger as '
    DECLARE
        user_count int;
    BEGIN
        SELECT count(*) from user_team into user_count WHERE team_id = new.team_id;
        if user_count > 3
            THEN RAISE EXCEPTION ''team is full'';
        END IF;
        RETURN new;
    END;
' language 'plpgsql';
CREATE TRIGGER limit_team_size BEFORE
INSERT ON user_teams FOR EACH ROW EXECUTE PROCEDURE limit_team_size_func();
















-- creating team trigger
DROP TRIGGER IF EXISTS add_creator_on_team_creation ON teams;
CREATE OR REPLACE function add_creator_to_user_teams() returns trigger as '
DECLARE
BEGIN
    INSERT INTO user_teams (team_id, user_id) VALUES (new.team_id, new.creator_id);
    RETURN new;
END;
' language 'plpgsql';
CREATE TRIGGER add_creator_on_team_creation BEFORE
INSERT ON teams FOR EACH ROW EXECUTE PROCEDURE add_creator_to_user_teams();

