import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { AaaService } from './aaa/aaa.service';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';
import { RoleModule } from './role/role.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { FasitfyAppController } from './fastify.app.controller';
import { AaaMiddleware } from './aaa/aaa.middleware';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TapTestInterceptor } from './aaa/aaa.interceptor';
import { PipeModule } from './pipe/pipe.module';
import { DtoModule } from './dto/dto.module';
import { DtoValidationPipe } from './dto/dto.pipe';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    PersonModule,
    AaaModule,
    BbbModule,
    CccModule,
    DddModule,
    RoleModule,
    DynamicModuleModule,
    PipeModule,
    DtoModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TapTestInterceptor,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: DtoValidationPipe,
    // },
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'customUseValue',
      useValue: { name: 'beige' },
    },
    {
      provide: 'customUseFactaory',
      inject: ['app_service', 'customUseValue'],
      useFactory: async (
        appService: AppService,
        customUseValue: { name: string },
      ) => {
        // 支持异步
        await Promise.resolve();
        return {
          age: 22,
          name: customUseValue.name,
          desc: appService.getHello(),
        };
      },
    },
    {
      provide: 'customUseExisting',
      useExisting: 'customUseValue',
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AaaMiddleware).forRoutes('*');
    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'aaa/hello', method: RequestMethod.GET });
    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'aaa/ip', method: RequestMethod.GET });
  }
}
