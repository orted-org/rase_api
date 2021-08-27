import { v4 } from "uuid";
function generateNewUUID(): string {
  return v4();
}
function generateNewUserID(): string {
  return v4();
}
function generateSessionID(): string {
  return v4();
}
export { generateNewUserID, generateSessionID, generateNewUUID };
