import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found/entity-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
    }),
  );
  app.useGlobalFilters(new EntityNotFoundFilter());
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
