import { Global, Module, forwardRef } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app.service';

@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule {}
