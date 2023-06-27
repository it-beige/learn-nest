import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject('app_service') private readonly appService: AppService) {}
  @Inject('customUseValue') private readonly customUseValue;
  @Inject('customUseFactaory') private readonly customUseFactaory;
  @Inject('customUseExisting') private readonly customUseExisting;

  @Get()
  getHello(): string {
    console.log(this.customUseValue);
    console.log(this.customUseFactaory);
    console.log(this.customUseExisting);
    return this.appService.getHello();
  }
}
