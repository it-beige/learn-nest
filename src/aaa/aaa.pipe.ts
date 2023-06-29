import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class AaaPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log('Pipe');
    const parseValue = parseInt(value, 10);
    if (isNaN(parseValue)) {
      throw new BadRequestException('Invalid number');
    }
    return parseValue;
  }
}
