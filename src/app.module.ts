import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// 根模块
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, LoginModule], // 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入
  controllers: [AppController], // 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
  providers: [AppService], // 注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享
})

// 导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
export class AppModule {}
