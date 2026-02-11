import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as crypto from "crypto";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(webp)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: 1000 * 1000 * 10,
            message: "Файл может быть не больше 10мб",
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.fileService.update(file);
  }
}
