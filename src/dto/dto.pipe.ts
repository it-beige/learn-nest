import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Optional,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DtoValidationPipe implements PipeTransform<any> {
  // 可注入依赖
  @Optional()
  @Inject('VALIDATE_OPTIONS')
  private readonly vlidateOptions;

  async transform(value: any, { metatype }: ArgumentMetadata) {
    this.vlidateOptions;
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
