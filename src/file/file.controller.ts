import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './upload';
import { FileSizeValidationPipe } from './file.pipe';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MyFileValidator } from './file.validator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Post('upload')
  @UseInterceptors(
    // FileInterceptor('file' {dest: 'uploads'})
    // FilesInterceptor('files', 9, {dest: 'uploads'})
    // FileFieldsInterceptor(
    //   [
    //     { name: 'aaa', maxCount: 1 },
    //     { name: 'bbb', maxCount: 2 },
    //   ],
    //   { dest: 'uploads' },
    // ),
    // AnyFilesInterceptor({ dest: 'uploads' }),
    AnyFilesInterceptor({
      storage,
    }),
  )
  uploadFile(
    @UploadedFiles(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 100 }),
      //     new FileTypeValidator({ fileType: 'image/vnd.adobe.photoshop' }),
      //   ],
      // }),
      new ParseFilePipe({
        validators: [new MyFileValidator({})],
      }),
    )
    files: // @UploadedFiles(new FileSizeValidationPipe(1024 * 1024 * 0.1))
    Array<Express.Multer.File>,
    @Body() body,
  ) {
    return files;
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
