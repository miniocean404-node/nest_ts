// AngularJS、Spring和Nest.js都是基于控制反转原则设计的,而且都使用了依赖注入的方式来解决解耦问题。
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './core/filter/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import csrf from 'csurf'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {})
  // 为什么我们需要前缀？ 好的 API 在设计时要考虑到向后的兼容性。当增强或增加一个 API 时，我们应该确保已经线上使用到该 API的业务不受影响。"简而言之，API 前缀是为了向后兼容。
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    maxAge: 3000,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  app.use(
    csrf({ cookie: true }), // CSRF保护
    // 为了保护您的应用程序免受暴力攻击，您必须实现某种速率限制
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }),
    helmet(), // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响。
  )

  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  const root = join(__dirname, '..')
  // app.use('/public', express.static(join(rootDir, 'public')));
  app.useStaticAssets(join(root, 'public'), { prefix: '/public' })

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('接口文档描述')
    .setVersion('1.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000)
  console.log('http://localhost:3000')
}

bootstrap().then()
