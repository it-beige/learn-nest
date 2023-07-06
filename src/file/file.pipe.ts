import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(readonly maxFileSize: number) {}
  transform(files: Express.Multer.File[], metadata: ArgumentMetadata) {
    const fileSizeExceeded = files.some((file) => file.size > this.maxFileSize);
    if (fileSizeExceeded) {
      throw new HttpException(
        `File size exceeded. Maximum file size allowed is ${this.maxFileSize} bytes.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return files;
  }
}
