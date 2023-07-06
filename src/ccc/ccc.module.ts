import { DynamicModuleModule } from './../dynamic-module/dynamic-module.module';
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
import { AppService } from 'src/app.service';
import { DddService } from 'src/ddd/ddd.service';

DynamicModuleModule;
@Module({
  imports: [
    forwardRef(() => DddModule),
    // DynamicModuleModule.register({ name: 'beige' }),
    DynamicModuleModule.register({ aaa: 111, bbb: 'bbb' }),
  ],
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
