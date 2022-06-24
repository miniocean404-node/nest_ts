import { AppModule } from '@/app.module'
import { GlobalExceptionFilter } from '@/filter/exception.global.filter'
import { HttpExceptionFilter } from '@/filter/exception.http.filter'
import { JwtGlobalGuard } from '@/guard/jwt.global.guard'
import { TransformInterceptor } from '@/interceptor/transform.global.interceptor'
import middleware from '@/middleware/global_middleware'
import { src } from '@/utils/path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

	app.setGlobalPrefix('api/v1')
	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
		maxAge: 3000,
	})

	// 生命周期是以下顺序
	app.use(...middleware) // 中间件
	app.useGlobalGuards(new JwtGlobalGuard()) //  守卫
	app.useGlobalInterceptors(new TransformInterceptor()) // 拦截器
	app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter()) // 过滤器
	app.useGlobalPipes(new ValidationPipe()) // 管道

	// 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
	const root = src
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
	console.log('http://localhost:3000/api/v1')
	console.log('接口文档:http://localhost:3000/doc')
}

bootstrap().then()
