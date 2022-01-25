import { Body, Controller, Post } from '@nestjs/common'
import { LoginService } from './login.service'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'

@ApiTags('登录')
@Controller('login')
export class LoginController {
  constructor(
    private readonly service: LoginService,
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录')
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    )
    switch (authResult.code) {
      case 1:
      // return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        }
      default:
        return {
          code: 600,
          msg: `查无此人`,
        }
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    return await this.usersService.register(body)
  }
}
