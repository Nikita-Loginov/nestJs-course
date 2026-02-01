import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  Max,
} from "class-validator";
import { StartsWith } from "../decorators/start-with.decorator";

export enum TaskTag {
  WORK = "work",
  STUDY = "study",
  HOME = "home",
}

export class CreateTaskDto {
  @IsString({
    message: "Мне нужна для title строчка",
  })
  @IsNotEmpty({
    message: "Нельзя пустой title",
  })
  // @StartsWith('todo')
  @Length(2, 30, {
    message: "title должен быть от 2 до 30 символов",
  })
  title: string;

  @IsInt({
    message: "Приоритет должен быть целым числом",
  })
  @IsPositive({ message: "Приоритет должен быть положительным" })
  @IsOptional()
  priority: number;

  @IsArray({ message: "Теги должны быть массивом" })
  @IsEnum(TaskTag, { message: "Недопустимое значение тега", each: true })
  @IsOptional()
  tags: TaskTag[];
}


