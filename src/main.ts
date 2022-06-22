import { HttpExceptionFilter } from '@/core/filter/http-exception.filter'
import { TransformInterceptor } from '@/core/interceptor/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

	app.use(
		helmet(), // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响。
		cookieParser(),
		csrf({ cookie: true }), // CSRF保护
		// 为了保护您的应用程序免受暴力攻击，您必须实现某种速率限制
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // 将每个 IP 限制为每个窗口 1Ms 100 个请求
			standardHeaders: true, // 在 `RateLimit-*` 头中返回速率限制信息
			legacyHeaders: false, // 禁用 `X-RateLimit-*` 头
		})
	)

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
	console.log('http://localhost:3000/api/v1')
	console.log('接口文档:http://localhost:3000/doc')
}

bootstrap().then()
