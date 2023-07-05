import { DddService } from './../ddd/ddd.service';
import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
  Optional,
  forwardRef,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements OnApplicationBootstrap, OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(forwardRef(() => DddService))
    private readonly dddService: DddService,
  ) {}
  // @Optional, 如果provider没有提供, @Inject也没有报错
  // @Optional() @Inject('DddService') dddService: DddService;
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  ccc() {
    return 'ccc' + this.dddService.ddd();
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
