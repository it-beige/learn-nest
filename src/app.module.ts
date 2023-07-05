import { Module } from '@nestjs/common';
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

// @Module({
//   imports: [
//     PersonModule,
//     AaaModule,
//     BbbModule,
//     CccModule,
//     DddModule,
//     RoleModule,
//     DynamicModuleModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     // {
//     //   provide: AppService,
//     //   useClass: AppService,
//     // },
//     {
//       provide: 'app_service',
//       useClass: AppService,
//     },
//     {
//       provide: 'customUseValue',
//       useValue: { name: 'beige' },
//     },
//     {
//       provide: 'customUseFactaory',
//       inject: ['app_service', 'customUseValue'],
//       useFactory: async (
//         appService: AppService,
//         customUseValue: { name: string },
//       ) => {
//         // 支持异步
//         await Promise.resolve();
//         return {
//           age: 22,
//           name: customUseValue.name,
//           desc: appService.getHello(),
//         };
//       },
//     },
//     {
//       provide: 'customUseExisting',
//       useExisting: 'customUseValue',
//     },
//   ],
// })

@Module({
  controllers: [FasitfyAppController],
})
export class AppModule {}
