import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/utils/filter';
import { RequestGuard } from './common/utils/guards';
import { TimeoutInterceptor } from './common/utils/timeout';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  // guards
  app.useGlobalGuards(new RequestGuard());

  // filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // prefix
  app.setGlobalPrefix('/api/v1');

  // pipeline validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
