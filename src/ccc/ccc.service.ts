import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements OnApplicationBootstrap, OnModuleInit, OnModuleDestroy
{
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  onModuleInit() {
    console.log(this.constructor.name + ' onModuleInit');
  }
  onApplicationBootstrap() {
    console.log(this.constructor.name + ' onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log(this.constructor.name + ' onModuleDestroy');
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
}