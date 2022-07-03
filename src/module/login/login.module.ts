import { UserModule } from '@/module/user/user.module'
import { Module } from '@nestjs/common'

import { AuthModule } from '@/module/auth/auth.module'
import { UserService } from '@/module/user/user.service'

import { LoginController } from './login.controller'

@Module({
  // 不导入AuthService是因为：AuthService中还使用了JwtService,import会将其一起导入
  imports: [AuthModule, UserModule],
  controllers: [LoginController],
  providers: [UserService],
})
export class LoginModule {}
