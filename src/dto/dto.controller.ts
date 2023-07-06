import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DtoService } from './dto.service';
import { CreateDtoDto } from './dto/create-dto.dto';
import { UpdateDtoDto } from './dto/update-dto.dto';
import { DtoValidationPipe } from './dto.pipe';

@Controller('dto')
export class DtoController {
  constructor(private readonly dtoService: DtoService) {}

  @Post()
  // @UsePipes(DtoValidationPipe)
  @UsePipes(ValidationPipe)
  create(@Body() createDtoDto: CreateDtoDto) {
    return this.dtoService.create(createDtoDto);
  }

  @Get()
  findAll() {
    return this.dtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDtoDto: UpdateDtoDto) {
    return this.dtoService.update(+id, updateDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoService.remove(+id);
  }
}
