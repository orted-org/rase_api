import { UserRoleType, UUIDType, SubIdType } from "../Types/Types.Global";
interface IUser {
  userId: UUIDType;
  subId: SubIdType;
  fullName: string;
  profilePicture: string;
  email: string;
  role: UserRoleType;
}
export { IUser };
