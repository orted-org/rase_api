export const USER_ROLE_TYPE = {
  name: "user_role_type",
  enum :{
    student : "student",
    teacher : "teacher"
  }
}

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
