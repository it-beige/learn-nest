import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';
import { DddModule } from 'src/ddd/ddd.module';

@Module({
  imports: [forwardRef(() => DddModule)],
  controllers: [CccController],
  providers: [CccService],
  exports: [CccService],
})
export class CccModule
  implements OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown
{
  beforeApplicationShutdown() {
    console.log(this.constructor.name + ' beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    console.log(this.constructor.name + ' onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log(this.constructor.name + ' onModuleDestroy');
  }
}
