import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class PhoneDto {
  @IsNotEmpty()
  @IsInt()
  @Min(100)
  price: number;

  @IsNotEmpty()
  @MaxLength(64)
  @IsString()
  brand: string;
}
