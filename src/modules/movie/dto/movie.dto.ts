import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class MovieDto {
  @ApiProperty({
    description: "Название фильма",
    example: "Movie name",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Год релиза фильма",
    example: 2024,
    type: Number,
    minimum: 1990,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: "Ссылка на фотографию постера фильма",
    example: "https://example.com",
    type: String,
    maximum: 255,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: "Массив ids актеров",
    example: ['c474819f-6d25-40e7-8a61-265ef4940c47', 'd484819f-6d25-40e7-8a61-265ef4940c47'],
    type: [String],
  })
  @IsArray()
  @IsUUID("4", { each: true })
  @IsOptional()
  actorIds: string[];
}
