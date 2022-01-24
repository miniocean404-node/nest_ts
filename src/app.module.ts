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
  ], // 导入其他模块中导出的Providers，这些模块导出了此模块中所需提供者，以实现共享
  controllers: [AppController, UserController], // 必须创建的一组控制器 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
  providers: [], // 注入器实例化的提供者（服务提供者），处理具体的业务逻辑，模块内共享使用；
  exports: [], // 导出其他模块需要共享的Providers
})

// 导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
export class AppModule {}
