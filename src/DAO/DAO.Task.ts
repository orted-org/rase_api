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
                        ${TASK_TABLE.attr.taskSubmissionType}
                    )
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING 
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskSubmissionType}
                    `;

const _updateTaskById = `
                    UPDATE ${TASK_TABLE.name}
                    SET
                        ${TASK_TABLE.attr.taskTitle} = $1,
                        ${TASK_TABLE.attr.taskDescription} = $2,
                        ${TASK_TABLE.attr.taskDeadline} = $3,
                        ${TASK_TABLE.attr.taskAttachment} = $4,
                        ${TASK_TABLE.attr.taskSubmissionType} = $5
                    WHERE
                        ${TASK_TABLE.attr.taskId} = $6
                    RETURNING 
                        ${TASK_TABLE.attr.taskId},
                        ${TASK_TABLE.attr.taskTitle},
                        ${TASK_TABLE.attr.taskDescription},
                        ${TASK_TABLE.attr.taskDeadline},
                        ${TASK_TABLE.attr.taskAttachment}
                        ${TASK_TABLE.attr.taskSubmissionType}
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
                            ${TASK_TABLE.attr.taskSubmissionType}
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
                            ${TASK_TABLE.attr.taskSubmissionType}     
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
                        ${TASK_TABLE.attr.taskSubmissionType}
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
                    taskData.taskSubmissionType
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
                        taskSubmissionType: row.taskSubmissionType
                    });
                })
                return resolve(returnData);
            } catch (error) {
                return reject(DBError(error));
            }
        })
    }

    GetTaskById(teamId: UUIDType) {
        return new Promise<ITask | null>(async (resolve, reject) => {
            const data = await client.query(_getTaskById, [
                teamId
            ]);
            return resolve({
                taskId: data.rows[0][TASK_TABLE.attr.taskId],
                taskTitle: data.rows[0][TASK_TABLE.attr.taskTitle],
                taskDescription: data.rows[0][TASK_TABLE.attr.taskDescription],
                taskDeadline: data.rows[0][TASK_TABLE.attr.taskDeadline],
                taskAttachment: data.rows[0][TASK_TABLE.attr.taskAttachment],
                taskSubmissionType: data.rows[0][TASK_TABLE.attr.taskSubmissionType]
            })
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
                    newTaskData.taskSubmissionType,
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
