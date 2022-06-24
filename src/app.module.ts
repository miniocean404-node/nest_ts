// import { TypeOrmModule } from '@nestjs/typeorm'
import { nestConfig } from '@/config/dotenv-config'
import { JwtMiddleware } from '@/middleware/jwt.middleware'
import WinstonConfig from '@/middleware/logger.config'
import { AuthModule } from '@/module/auth/auth.module'
import { ExampleModule } from '@/module/example/example.module'
import { FileModule } from '@/module/file/file.module'
import { LoginModule } from '@/module/login/login.module'
import { UserModule } from '@/module/user/user.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { WinstonModule } from 'nest-winston'
import { AppController } from './app.controller'
import { CsrfModule } from './module/csrf/csrf.module'

// 根模块
@Module({
  // imports 导入模块相当于导入这个模块所有的（包括这个模块导入的其他模块 包括：providers、imports）
  imports: [
    // 数据库连接
    // TypeOrmModule.forRoot(),
    WinstonModule.forRoot(WinstonConfig),
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 是否忽略.env文件
      isGlobal: true, // 是否全局
      cache: true, // 是否缓存
      expandVariables: true, // 启用环境变量扩展${}
      load: [nestConfig],
      // 校验是否符合规则，否则异常
      validationSchema: Joi.object({
        node_env: Joi.string().valid('development', 'production').default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        // 控制是否允许环境变量中的未知键
        allowUnknown: true,
        // 如果为真，则在第一个错误时停止验证；如果为 false，则返回所有错误
        abortEarly: false,
      },
    }),

    // 业务模块
    LoginModule,
    AuthModule,
    UserModule,
    FileModule,
    ExampleModule,
    CsrfModule,
  ],
  // 必须创建的一组控制器 处理http请求，包括路由控制，向客户端返回响应(按构造函数循序写)
  controllers: [AppController],
  // 注入器(inject)实例化的提供者（服务提供者,给controllers提供），处理具体的业务逻辑，模块内共享使用；
  providers: [],
  // 导出其他模块需要共享的Providers以及导入的模块(只能导出在那个模块的providers或imports中注册或导入过的模块或提供者)
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // apply() 使用 中间件 和 app.use 一样
    // forRoutes() 应用中间件的路由
    consumer.apply(JwtMiddleware).forRoutes('login')
  }
}
