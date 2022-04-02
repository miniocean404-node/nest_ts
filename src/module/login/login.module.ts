import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { UserService } from '../user/user.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserService],
  imports: [AuthModule],
})
export class LoginModule {}
