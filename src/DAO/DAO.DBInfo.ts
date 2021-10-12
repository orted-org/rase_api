export const USER_ROLE_TYPE = {
  name: "user_role_type",
  enum: {
    student: "student",
    teacher: "teacher",
  },
};

export const USER_TABLE = {
  name: "users",
  attr: {
    userId: "user_id",
    subId: "sub_id",
    fullName: "full_name",
    profilePicture: "profile_picture",
    email: "email",
    role: "role",
  },
};

export const TEAM_TABLE = {
  name: "teams",
  attr: {
    teamId: "team_id",
    teamName: "team_name",
    teamDescription: "description",
    creatorId: "creator_id",
  },
};

export const USER_TEAMS_TABLE = {
  name: "user_teams",
  attr: {
    userId: "user_id",
    teamId: "team_id",
  },
};

export const ATTACHMENT_TYPE = {
  name : "attachment_type",
  enum : {
    text : "text",
    path : "path",
    link : "link"
  }
}

export const TASK_TABLE = {
  name : "tasks",
  attr : {
    taskId : "task_id",
    taskTitle : "title",
    taskDescription : "description",
    taskDeadline : "deadline",
    taskAttachment : "attachment",
    taskSubmissionType : "submission_type"
  }
}
