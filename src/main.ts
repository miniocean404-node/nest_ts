import { AppModule } from '@/app.module'
import { GlobalExceptionFilter } from '@/global/filter/global-exception.filter'
import { HttpExceptionFilter } from '@/global/filter/http-exception.filter'
import { TransformInterceptor } from '@/global/interceptor/transform.interceptor'
import middleware from '@/global/middleware'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

	app.use(...middleware)

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
	app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter())
	app.useGlobalInterceptors(new TransformInterceptor())

	// 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
	const root = process.cwd() || join(__dirname, '..')
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
