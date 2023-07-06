import { Module } from '@nestjs/common';
import { DtoService } from './dto.service';
import { DtoController } from './dto.controller';

@Module({
  controllers: [DtoController],
  providers: [
    DtoService,
    {
      provide: 'VALIDATE_OPTIONS',
      useFactory: () => {
        return {
          aaa: 1,
        };
      },
    },
  ],
})
export class DtoModule {}
