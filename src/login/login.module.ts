import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserService],
  imports: [AuthModule],
  exports: [LoginService],
})
export class LoginModule {}
