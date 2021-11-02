import { TASK_TABLE } from "./DAO.DBInfo";
import { UUIDType } from "../Types/Types.Global";
import { ITask } from "./../Interfaces/Interface.Task";
import DBError from "../Helpers/ErrorHandling/Helper.EH.DBError";
import { client } from "../Helpers/Helper.DBInit";
import { resolve } from "path/posix";
import { rejects } from "assert";

const _createTask = `
                    INSERT INTO ${TASK_TABLE.name}
                    (
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskAttachmentType}
                    )
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING 
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskAttachmentType}
                    `;

const _updateTaskById = `
                    UPDATE ${TASK_TABLE.name}
                    SET
                        ${TASK_TABLE.attr.taskTitle} = $1,
                        ${TASK_TABLE.attr.taskDescription} = $2,
                        ${TASK_TABLE.attr.taskDeadline} = $3,
                        ${TASK_TABLE.attr.taskAttachment} = $4,
                        ${TASK_TABLE.attr.taskAttachmentType} = $5
                    WHERE
                        ${TASK_TABLE.attr.taskId} = $6
                    RETURNING 
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskAttachmentType}
                    `;


const _deleteTaskById = `
                        DELETE 
                            ${TASK_TABLE.name}
                        WHERE 
                            ${TASK_TABLE.attr.taskId} = $1
                        RETURNING 
                            ${TASK_TABLE.attr.taskId},
                            ${TASK_TABLE.attr.taskTitle},
                            ${TASK_TABLE.attr.taskDescription},
                            ${TASK_TABLE.attr.taskDeadline},
                            ${TASK_TABLE.attr.taskAttachment}
                            ${TASK_TABLE.attr.taskAttachmentType}
`;

const _getAllTasks = `
                        SELECT *
                        FROM 
                            ${TASK_TABLE.name}
                        RETURNING 
                            ${TASK_TABLE.attr.taskId},
                            ${TASK_TABLE.attr.taskTitle},
                            ${TASK_TABLE.attr.taskDescription},
                            ${TASK_TABLE.attr.taskDeadline},
                            ${TASK_TABLE.attr.taskAttachment}
                            ${TASK_TABLE.attr.taskAttachmentType}     
`;

const _getTaskById = `
                    SELECT *
                    FROM 
                        ${TASK_TABLE.name}
                    WHERE 
                        ${TASK_TABLE.attr.taskId} = $1
                    RETURNING 
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskAttachmentType}
`;


interface ITaskDAO {
    CreateTask: (taskData: ITask) => Promise<ITask>;
    GetAllTasks: () => Promise<ITask[]>;
    GetTaskById: (teamId: UUIDType) => Promise<ITask | null>;
    UpdateTaskById: (newTaskData: ITask) => Promise<ITask | null>;
    DeleteTaskById: (taskId: UUIDType) => Promise<ITask | null>;
}

class TaskDAO implements ITaskDAO {
    CreateTask(taskData: ITask) {
        return new Promise<ITask>(async (resolve, reject) => {
            try {
                const data = await client.query(_createTask, [
                    taskData.taskId,
                    taskData.taskTitle,
                    taskData.taskDescription,
                    taskData.taskDeadline,
                    taskData.taskAttachment,
                    taskData.taskAttachmentType
                ]);
                resolve(taskData);
            } catch (err) {
                return reject(DBError(err));
            }
        })
    }


    GetAllTasks() {
        return new Promise<ITask[]>(async (resolve, reject) => {
            try {
                const data = await client.query(_getAllTasks, []);
                const returnData: ITask[] = [];
                data.rows.map((row) => {
                    returnData.push({
                        taskId: row.taskId,
                        taskTitle: row.taskTitle,
                        taskDescription: row.taskDescription,
                        taskDeadline: row.taskDeadline,
                        taskAttachment: row.taskAttachment,
                        taskAttachmentType: row.taskAttachmentType
                    });
                })
                return resolve(returnData);
            } catch (error) {
                return reject(DBError(error));
            }
        })
    }

    GetTaskById(taskId: UUIDType) {
        return new Promise<ITask | null>(async (resolve, reject) => {
            try {
                const data = await client.query(_getTaskById, [
                    taskId
                ]);
                return resolve({
                    taskId: data.rows[0][TASK_TABLE.attr.taskId],
                    taskTitle: data.rows[0][TASK_TABLE.attr.taskTitle],
                    taskDescription: data.rows[0][TASK_TABLE.attr.taskDescription],
                    taskDeadline: data.rows[0][TASK_TABLE.attr.taskDeadline],
                    taskAttachment: data.rows[0][TASK_TABLE.attr.taskAttachment],
                    taskAttachmentType: data.rows[0][TASK_TABLE.attr.taskAttachmentType]
                })
            } catch(err) {
                reject(err);
            }
        })
    }

    UpdateTaskById(newTaskData: ITask) {
        return new Promise<null>(async (resolve, reject) => {
            try {
                await client.query(_updateTaskById, [
                    newTaskData.taskTitle,
                    newTaskData.taskDescription,
                    newTaskData.taskDeadline,
                    newTaskData.taskAttachment,
                    newTaskData.taskAttachmentType,
                    newTaskData.taskId
                ])
                return resolve(null);
            } catch (err) {
                return reject(err);
            }
        })
    }


    DeleteTaskById (taskId: string) {
        return new Promise<ITask | null> (async (resolve, reject) => {
            try {
                const data = client.query(_deleteTaskById, [taskId]);
                return resolve(null);
            } catch(err) {
                return reject(err);
            }
        })
    }
}

export { TaskDAO };
