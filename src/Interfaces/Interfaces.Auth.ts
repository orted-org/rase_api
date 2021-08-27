import { UserRoleType } from "../Types/Types.Global";

interface OAuthPayload {
  fullName: string;
  email: string;
  profilePicture: string;
  subId: string;
  role: UserRoleType;
}
export type { OAuthPayload };
