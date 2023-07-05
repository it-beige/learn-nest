import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';
import { CccService } from 'src/ccc/ccc.service';

@Injectable()
export class DddService {
  constructor(
    @Inject(forwardRef(() => CccService))
    private readonly cccService: CccService,
  ) {}

  create(createDddDto: CreateDddDto) {
    return 'This action adds a new ddd';
  }

  ddd() {
    return 'ddd';
  }

  findAll() {
    return `This action returns all ddd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ddd`;
  }

  update(id: number, updateDddDto: UpdateDddDto) {
    return `This action updates a #${id} ddd`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddd`;
  }
}
