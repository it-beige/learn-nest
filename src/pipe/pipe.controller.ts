import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  Query,
  ParseFloatPipe,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  UsePipes,
} from '@nestjs/common';
import { PipeService } from './pipe.service';
import { CreatePipeDto } from './dto/create-pipe.dto';
import { UpdatePipeDto } from './dto/update-pipe.dto';
import { CustomPipe } from './pipe.pipe';

enum ENUM_TEST {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

@Controller('pipe')
export class PipeController {
  constructor(private readonly pipeService: PipeService) {}

  @Post()
  create(@Body() createPipeDto: CreatePipeDto) {
    return this.pipeService.create(createPipeDto);
  }

  @Get()
  @UsePipes(CustomPipe)
  findAll(@Query('a') a: string, @Query('b') b: string) {
    return a + b;
  }

  @Get('enum/:enum')
  enum(@Param('enum', new ParseEnumPipe(ENUM_TEST)) e: ENUM_TEST) {
    return e;
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // new ParseIntPipe({
      //   exceptionFactory: (error) => {
      //     throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
      //   },
      // }),
      //   new ParseArrayPipe({
      //     items: Number,
      //     separator: '..',
      //   }),
      // ParseUUIDPipe,
    )
    id: Array<number>,
    @Query(
      'ids',
      // new ParseArrayPipe({
      //   items: Number,
      //   optional: true,
      // }),
      new DefaultValuePipe('1'),
    )
    ids: Array<number>,
  ) {
    return id;
    // return id.reduce((a, b) => a + b);
    // return this.pipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipeDto: UpdatePipeDto) {
    return this.pipeService.update(+id, updatePipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipeService.remove(+id);
  }
}
