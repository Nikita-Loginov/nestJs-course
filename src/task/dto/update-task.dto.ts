import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class UpdateTaskDto {
  @IsString({
    message: "Мне нужна для title строчка",
  })
  @IsNotEmpty({
    message: "Нельзя пустой title",
  })
  @Length(2, 30, {
    message: "title должен быть от 2 до 30 символов",
  })
  title: string;

  @IsBoolean({
    message: "Передай булевое значение для isCompleted"
  })
  @IsNotEmpty({
    message: "Нельзя пустой isCompleted",
  })
  @IsOptional()
  isCompleted: boolean;
}
