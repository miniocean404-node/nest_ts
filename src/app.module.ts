import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { LoginModule } from './login/login.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileModule } from './file/file.module'
import { WinstonModule } from 'nest-winston'
import { AuthModule } from './auth/auth.module'
import WinstonConfig from './core/middleware/logger.config'
import { UserController } from './user/user.controller'
import { ExampleModule } from './example/example.module'

// 根模块
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot(WinstonConfig),
    FileModule,
    UserModule,
    AuthModule,
    ExampleModule,
  ], // 导入模块的列表，这些模块导出了此模块中所需提供者
  controllers: [AppController, UserController], // 必须创建的一组控制器 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
  providers: [], // 注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享
  exports: [], // 由本模块提供并应在其他模块中可用的提供者的子集。
})

// 导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
export class AppModule {}
