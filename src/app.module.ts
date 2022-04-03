import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule } from 'nest-winston'
import WinstonConfig from '@/core/middleware/logger.config'

import { AppController } from './app.controller'
import { LoginModule } from '@/module/login/login.module'
import { AuthModule } from '@/module/auth/auth.module'
import { UserModule } from '@/module/user/user.module'
import { FileModule } from '@/module/file/file.module'
import { ExampleModule } from '@/module/example/example.module'

// 根模块
@Module({
	// imports 导入模块相当于导入这个模块所有的（包括这个模块导入的其他模块 包括：providers、imports）
	imports: [
		// 数据库连接
		TypeOrmModule.forRoot(),
		WinstonModule.forRoot(WinstonConfig),
		LoginModule,
		AuthModule,
		UserModule,
		FileModule,
		ExampleModule,
	],
	// 必须创建的一组控制器 处理http请求，包括路由控制，向客户端返回响应(按构造函数循序写)
	controllers: [AppController],
	// 注入器(inject)实例化的提供者（服务提供者,给controllers提供），处理具体的业务逻辑，模块内共享使用；
	providers: [],
	// 导出其他模块需要共享的Providers以及导入的模块(只能导出在那个模块的providers或imports中注册或导入过的模块或提供者)
	exports: [],
})
export class AppModule {}
