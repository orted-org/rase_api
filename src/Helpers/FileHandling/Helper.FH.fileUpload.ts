import express, {Request, Response, NextFunction} from "express";
import {generateNewTaskID} from "./../Helper.Task.Factory";
import multer from "multer";
import { makeError } from "../ErrorHandling/Helper.EH.MakeError";
import _path from "../Helper.rootPath";
import path from "path";

function UploadFile(
    req: Request,
    res: Response
) {
    return new Promise<string>((resolve, reject) => {
        let taskId = generateNewTaskID();
        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path.join(_path, 'files/tasks'));
                },
                filename: function (req, file, cb) {
                    cb(null, taskId);
                }
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype !== "application/pdf") {
                    cb(new Error("File is not pdf"));
                }
                cb(null, true);
            },
            limits: {
                fileSize: 10 * 1048576,
            },
        }).single("file");
        upload(req, res, (err) => {
            if (!req.file) {
                return reject(
                    new makeError.UnprocessableEntity(
                        "no file or file not suitable to be uploaded"
                    )
                );
            }
            return resolve('./tasks/' + taskId);
        });
    });
}

export {UploadFile};