import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as crypto from "crypto";
import * as fs from "fs";
import { cwd } from "process";

@Injectable()
export class FileService {
  update(file: Express.Multer.File) {
    const uploadDir = path.resolve(process.cwd(), 'uploads')

    const ext = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${ext}`;

    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    return {
      path: `/uploads/${fileName}`,
    };
  }
}
