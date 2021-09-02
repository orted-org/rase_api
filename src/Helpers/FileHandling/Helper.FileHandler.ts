import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import ENV from "../Config/env";
import { makeError } from "../ErrorHandling/Helper.EH.MakeError";

function SaveFile(fileName: string, req: Request, res: Response) {
  return new Promise<string>((resolve, reject) => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: ENV.fileHandling.relPath,
        filename: (req, file, cb) => {
          cb(null, fileName + path.extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        switch (path.extname(file.originalname)) {
          // allowed file types
          case ".pdf":
            break;
          case ".docx":
            break;
          case ".zip":
            break;
          case ".pptx":
            break;
          default:
            cb(new Error("File is not pdf"));
            break;
        }
        cb(null, true);
      },
      limits: {
        // file limit set to 10 MB
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
      return resolve(fileName + path.extname(req.file.originalname));
    });
  });
}
function GetFile(fileRef: string): string {
  return path.join(ENV.fileHandling.relPath, fileRef);
}
export { SaveFile, GetFile };
