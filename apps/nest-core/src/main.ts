import { AppModule } from '@app/nest-core/app.module'
import { CustomGlobalExceptionFilter } from '@app/nest-core/common/filter/exception.global.filter'
import { HttpExceptionFilter } from '@app/nest-core/common/filter/exception.http.filter'
import { JwtGlobalGuard } from '@app/nest-core/common/guard/jwt.global.guard'
import { TimeoutInterceptor } from '@app/nest-core/common/interceptor/timeout.interceptor'
import { TransformInterceptor } from '@app/nest-core/common/interceptor/transform.global.interceptor'
import middleware from '@app/nest-core/common/middleware/global_middleware'
import { CustomValidationPipe } from '@app/nest-core/common/pipe/validation.pipe'
import { PUBLIC_PATH, VIEW_PATH } from '@app/nest-core/config/constant/path'
import VIRTUAL_PATH from '@app/nest-core/config/constant/router-path.enum'
import { getIpAddress } from '@app/nest-core/utils/ip'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import chalk from 'chalk'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

  app.setGlobalPrefix(VIRTUAL_PATH.API)
  app.enableVersioning({
    // 默认情况下，URI 中的版本将自动以 v 为前缀
    // 可以使用 VersioningType.HEADER 请求头控制 type: VersioningType.HEADER, header: 'Custom-Header',
    // 可以使用 Accept 请求的标头 指定版本 type: VersioningType.MEDIA_TYPE， key: 'v=', 例如头: Accept: application/json;v=2
    type: VersioningType.URI,
    defaultVersion: VIRTUAL_PATH.VERSION, // 全局版本 支持三种, '1'、['1', '2']、VERSION_NEUTRAL
  })

  // 开启跨域
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
  app.useStaticAssets(PUBLIC_PATH, { prefix: VIRTUAL_PATH.STATIC_ASSETS })
  // mvc 渲染 类似 jsp
  app.setBaseViewsDir(VIEW_PATH)

  app.setViewEngine('pug')

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('接口文档描述')
    .setVersion('1.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(VIRTUAL_PATH.SWAGGER_DOC, app, document)

  await app.listen(3000)

  const ip = getIpAddress()
  const address = ip || 'localhost'
  console.log('\r\n')
  console.log(chalk.blue(`接口地址: http://${address}:3000/${VIRTUAL_PATH.API}/v${VIRTUAL_PATH.VERSION}`))
  console.log(chalk.blue(`MVC渲染: http://${address}:3000/${VIRTUAL_PATH.API}/v${VIRTUAL_PATH.VERSION}/app`))
  console.log(chalk.blue(`接口文档: http://${address}:3000/${VIRTUAL_PATH.SWAGGER_DOC}`))
  console.log(chalk.blue(`SPA 渲染路径: http://${address}:3000/${VIRTUAL_PATH.SPA_RENDER}`))
  console.log(chalk.blue(`静态资源路径: http://${address}:3000/${VIRTUAL_PATH.STATIC_ASSETS}/upload/日期文件夹/文件名.ext`))
  console.log('\r\n')
}

bootstrap().then()
