import { IUser } from "./Interface.User";

interface OAuthPayload {
  fullName: string;
  email: string;
  profilePicture: string;
  subId: string;
}
interface ISession extends IUser {
  teamId: string | null;
}
export type { OAuthPayload, ISession };
