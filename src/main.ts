import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/filter';
import { RequestGuard } from './common/utils/guards';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { TransformationInterceptor } from './common/interceptor/response.interceptor';
import { environment } from './common/config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(helmet());

  // guards
  app.useGlobalGuards(new RequestGuard());

  // interceptors
  app.useGlobalInterceptors(
    new TransformationInterceptor(app.get(Reflector)),
    new TimeoutInterceptor(),
  );

  // filters
  app.useGlobalFilters(new HttpExceptionFilter());

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
  await app.listen(environment.APP.PORT || 3000);
}
bootstrap();
