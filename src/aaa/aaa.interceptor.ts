import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  Observable,
  TimeoutError,
  catchError,
  map,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { AaaService } from './aaa.service';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor');
    const request: Request = context.switchToHttp().getRequest();
    return next.handle();
  }
}

@Injectable()
export class TimerConSumingInterceptor implements NestInterceptor {
  constructor(private readonly aaaService: AaaService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

@Injectable()
export class MapTestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          message: 'success',
          data,
        };
      }),
    );
  }
}

@Injectable()
export class TapTestInterceptor implements NestInterceptor {
  constructor(private aaaService: AaaService) {}

  private readonly logger = new Logger(TapTestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // 这里是更新缓存的操作，这里模拟下
        this.aaaService.updateLog();

        this.logger.log(`log something`, data);
      }),
    );
  }
}

@Injectable()
export class CatchErrorTestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CatchErrorTestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(err.message, err.stack);
        return throwError(() => err);
      }),
    );
  }
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          console.log(err);
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
