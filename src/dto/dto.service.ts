import { Injectable } from '@nestjs/common';
import { CreateDtoDto } from './dto/create-dto.dto';
import { UpdateDtoDto } from './dto/update-dto.dto';

@Injectable()
export class DtoService {
  create(createDtoDto: CreateDtoDto) {
    return 'This action adds a new dto';
  }

  findAll() {
    return `This action returns all dto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dto`;
  }

  update(id: number, updateDtoDto: UpdateDtoDto) {
    return `This action updates a #${id} dto`;
  }

  remove(id: number) {
    return `This action removes a #${id} dto`;
  }
}
