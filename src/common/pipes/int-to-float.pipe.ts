import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IntToFloatPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const num = Number(value);

    if (isNaN(num)) {
      throw new BadRequestException(`Значение "${value}" не является числом`);
    }

    return num.toFixed(1);
  }
}
