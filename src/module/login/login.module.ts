import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { UserService } from '../user/user.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  // 不导入AuthService是因为：AuthService中还使用了JwtService,import会将其一起导入
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}
