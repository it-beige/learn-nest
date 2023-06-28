import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
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
