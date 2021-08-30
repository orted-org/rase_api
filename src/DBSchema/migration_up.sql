
CREATE TYPE user_role_type AS ENUM ('student', 'teacher');

CREATE TYPE attachment_type AS ENUM ('text', 'path', 'link');

-- USER TABLE
CREATE TABLE IF NOT EXISTS users(
    user_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    profile_picture TEXT,
    sub_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role_type NOT NULL DEFAULT 'student'
);

--TEAM TABLE
CREATE TABLE IF NOT EXISTS teams(
    team_id UUID PRIMARY KEY,
    team_name TEXT NOT NULL,
    creator_id UUID UNIQUE NOT NULL,
    description TEXT,
    FOREIGN KEY(creator_id) REFERENCES user(user_id) ON DELETE CASCADE
);

--USER_TEAM TABLE
CREATE TABLE IF NOT EXISTS user_teams(
    user_id UUID UNIQUE NOT NULL,
    team_id UUID NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ,
    FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE CASCADE
);

--TASK TABLE
CREATE TABLE IF NOT EXISTS tasks(
    task_id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    deadline DATE,
    attachment attachment_type,
    submission_type VARCHAR(20) NOT NULL
);


--SUBMISSION TABLE
CREATE TABLE IF NOT EXISTS submissions(
    submission_id UUID PRIMARY KEY,
    task_id INT UNIQUE NOT NULL,
    team_id INT UNIQUE NOT NULL,
    submission_string attachment_type NOT NULL,
    remark JSON,
    FOREIGN KEY(task_id) REFERENCES task(task_id),
    FOREIGN KEY(team_id) REFERENCES team(team_id)
);


