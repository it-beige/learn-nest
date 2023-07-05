import { Inject, Injectable, NestMiddleware, forwardRef } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  @Inject(forwardRef(() => AppService))
  private readonly appService: AppService;

  use(req: Request, res: Response, next: () => void) {
    console.log('before');
    console.log('-----' + this.appService.getHello());
    next();
    console.log('after');
  }
}
