import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  UsePipes,
  ParseIntPipe,
  Session,
  Ip,
  HostParam,
  Req,
  Res,
  Next,
  Header,
  HttpCode,
  Redirect,
  Query,
  Render,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { AaaFilter, CatchFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import {
  AaaInterceptor,
  CatchErrorTestInterceptor,
  MapTestInterceptor,
  TapTestInterceptor,
  TimeoutInterceptor,
  TimerConSumingInterceptor,
} from './aaa.interceptor';
import { AaaPipe } from './aaa.pipe';
import { Request, Response } from 'express';
import { Aaa, applyGetWithGuards, customParamDecorator } from './aaa.decorator';
import { AaaException } from './aaa.exeception';
import { resolve } from 'path';

// @Controller('aaa')
@Controller({ host: ':host.0.0.1', path: 'aaa' })
@SetMetadata('roles', ['user'])
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Get('hello')
  @UseGuards(AaaGuard)
  @UseInterceptors(
    TimerConSumingInterceptor,
    MapTestInterceptor,
    TapTestInterceptor,
    CatchErrorTestInterceptor,
    TimeoutInterceptor,
  )
  @SetMetadata('roles', ['admin'])
  async getHello() {
    // throw new Error('xx');
    await new Promise((resolve) => setTimeout(resolve, 1000 * 4));
    return 'hello Reflect.setMetadata';
  }

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }
  findAll() {
    return this.aaaService.findAll();
  }

  @Get('ip')
  ip(@Ip() ip: string, @HostParam() host: string) {
    console.log(`ip: ${ip}--- host: ${host}`);
  }

  @Get('req')
  req(@Req() request: Request) {
    console.log(request);
  }

  @Get('res')
  res(@Res({ passthrough: true }) response: Response) {
    console.log(response);
    // response.end('end');
  }

  @Get('headers')
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('name', 'beige')
  headers() {
    return 'success';
  }

  @Get('redirect')
  @Redirect()
  redirect(@Query() url: string) {
    return url;
  }

  @Get('hbs')
  @Render('user')
  hbs() {
    return { name: 'beige', age: 22 };
  }

  @Get('next')
  next1(@Next() next) {
    console.log('next1');
    next();
  }

  @Get('next')
  next2(@Next() next) {
    console.log('next2');
    next();
  }

  @Get('session')
  session(@Session() session) {
    if (!Reflect.has(session, 'count')) {
      session.count = 0;
    } else {
      session.count++;
    }
    return session.count;
  }

  @applyGetWithGuards('applyDecorators', ['admin'])
  applyDecorators() {
    return 'applyDecorators';
  }

  @applyGetWithGuards('createParamDecorator', ['admin'])
  createParamDecorator(@customParamDecorator('query') query): string {
    return JSON.stringify(query);
  }

  @applyGetWithGuards('exception', ['admin'])
  @UseFilters(CatchFilter)
  exception() {
    throw new AaaException('aaa', 'bbb');
  }

  @Aaa('admin')
  @UseGuards(AaaGuard)
  @UseFilters(AaaFilter)
  @UseInterceptors(AaaInterceptor)
  @UsePipes(AaaPipe)
  @Get(':id')
  @SetMetadata('roles', ['admin'])
  findOne(@Param('id') id: string) {
    console.log('Controller');
    throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
