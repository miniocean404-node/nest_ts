import { AppModule } from '@/app.module'
import { CustomGlobalExceptionFilter } from '@/common/filter/exception.global.filter'
import { HttpExceptionFilter } from '@/common/filter/exception.http.filter'
import { JwtGlobalGuard } from '@/common/guard/jwt.global.guard'
import { TimeoutInterceptor } from '@/common/interceptor/timeout.interceptor'
import { TransformInterceptor } from '@/common/interceptor/transform.global.interceptor'
import middleware from '@/common/middleware/global_middleware'
import { CustomValidationPipe } from '@/common/pipe/validation.pipe'
import { publicPath, viewsPath } from '@/utils/path'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import chalk from 'chalk'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

  app.setGlobalPrefix('api/nest')
  app.enableVersioning({
    // 默认情况下，URI 中的版本将自动以 v 为前缀
    // 可以使用 VersioningType.HEADER 请求头控制 type: VersioningType.HEADER, header: 'Custom-Header',
    // 可以使用 Accept 请求的标头 指定版本 type: VersioningType.MEDIA_TYPE， key: 'v=', 例如头: Accept: application/json;v=2
    type: VersioningType.URI,
    defaultVersion: '1', // 全局版本 支持三种, '1'、['1', '2']、VERSION_NEUTRAL
  })

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    maxAge: 3000,
  })

  const httpAdapter = app.get(HttpAdapterHost)

  // 生命周期是以下顺序
  app.use(...middleware) // 中间件
  app.useGlobalGuards(new JwtGlobalGuard()) //  守卫
  app.useGlobalInterceptors(new TransformInterceptor(), new TimeoutInterceptor()) // 拦截器
  app.useGlobalFilters(new CustomGlobalExceptionFilter(httpAdapter), new HttpExceptionFilter()) // 过滤器
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
      // 是否只保留 DTO 中的数据
      whitelist: true,
      // 根据对象的 DTO 类自动将有效负载转换为 DTO 中的类型
      transform: true,
    }),
    new CustomValidationPipe()
  ) // 管道

  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  // app.use('/public', express.static(join(rootDir, 'public')));
  app.useStaticAssets(publicPath, { prefix: '/public' })
  // mvc 渲染 类似 jsp
  app.setBaseViewsDir(viewsPath)

  app.setViewEngine('pug')

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

  console.log('\r\n')
  console.log(chalk.blue('接口地址:http://localhost:3000/api/nest/v1'))
  console.log(chalk.blue('MVC渲染:http://localhost:3000/api/nest/v1/app'))
  console.log(chalk.blue('接口文档:http://localhost:3000/doc'))
}

bootstrap().then()
