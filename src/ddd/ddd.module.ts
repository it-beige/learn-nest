import { Module, forwardRef } from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';
import { CccModule } from 'src/ccc/ccc.module';
import { CccService } from 'src/ccc/ccc.service';

@Module({
  imports: [forwardRef(() => CccModule)],
  controllers: [DddController],
  providers: [DddService],
  exports: [DddService],
})
export class DddModule {}
