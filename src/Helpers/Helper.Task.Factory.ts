import { v4 } from "uuid";

function generateNewTaskID(): string {
  return v4();
}

export { generateNewTaskID };