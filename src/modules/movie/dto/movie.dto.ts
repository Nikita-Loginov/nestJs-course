import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsUUID('4', {each: true})
  @IsOptional()
  actorIds: string[]
}
