import { UUIDType, AttachmentType } from "../Types/Types.Global";

interface ITask {
    taskId : UUIDType,
    taskTitle : string,
    taskDescription : string,
    taskDeadline : Date,
    taskAttachment : string,
    taskAttachmentType : AttachmentType
}
export { ITask }