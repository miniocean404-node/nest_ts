import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { LoginModule } from './login/login.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileModule } from './file/file.module'
import { WinstonModule } from 'nest-winston'
import { AuthModule } from './auth/auth.module'
import WinstonConfig from './core/middleware/logger.config'

// 根模块
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot(WinstonConfig),
    FileModule,
    UserModule,
    LoginModule,
    AuthModule,
  ], // 导入其他模块中导出的providers，这些模块导出了此模块中所需provider，以实现共享
  exports: [], // 导出其他模块需要共享的Providers(包含其构造函数引用的)
  controllers: [AppController], // 必须创建的一组控制器 处理http请求，包括路由控制，向客户端返回响应(按构造函数循序写)
  providers: [], // 注入器(inject)实例化的提供者（服务提供者,给controllers提供），处理具体的业务逻辑，模块内共享使用；
})
export class AppModule {}
