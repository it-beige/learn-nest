import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoDto } from './create-dto.dto';

export class UpdateDtoDto extends PartialType(CreateDtoDto) {}
