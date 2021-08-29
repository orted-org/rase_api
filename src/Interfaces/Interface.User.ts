import { UserRoleType, UserIdType, SubIdType } from "../Types/Types.Global";
interface IUser {
  userId: UserIdType;
  subId: SubIdType;
  fullName: string;
  profilePicture: string;
  email: string;
  role: UserRoleType;
}
export { IUser };
