import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'), { prefix: '/static' });
  app.use(
    session({
      secret: 'beige',
      cookie: { maxAge: 1000 * 60 },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // setTimeout(() => {
  //   app.close();
  // }, 1000 * 2);
  await app.listen(3000);
}
bootstrap();
