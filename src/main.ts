// AngularJS、Spring和Nest.js都是基于控制反转原则设计的,而且都使用了依赖注入的方式来解决解耦问题。
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  const root = join(__dirname, '..');
  // app.use('/public', express.static(join(rootDir, 'public')));
  app.useStaticAssets(join(root, 'public'), { prefix: '/public' });

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('接口文档描述')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000');
}

bootstrap().then();
