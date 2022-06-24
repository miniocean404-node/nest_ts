import { NoAuth } from '@/decorator/custom'
import { AuthService } from '@/module/auth/auth.service'
import { UserService } from '@/module/user/user.service'
import CustomExceptionError from '@/utils/exception'
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { LocalStrategy } from './../auth/local.strategy'
import { LoginService } from './login.service'

@ApiTags('登录')
@Controller('login')
export class LoginController {
  constructor(
    private readonly service: LoginService,
    private readonly usersService: UserService,
    // 使用 AuthService 校验用户
    private readonly authService: AuthService,
    // 使用 LocalStrategy 校验
    private readonly localStrategy: LocalStrategy
  ) {}

  @NoAuth()
  @Post('getToken')
  async login(@Body() { username, password }: any) {
    console.log('JWT验证 - Step 1: 用户请求登录')

    const authResult = await this.authService.validateUser(username, password)

    switch (authResult.code) {
      case 1:
        // 获取token
        return this.authService.certificate(authResult.user)
      case 2:
        throw new CustomExceptionError(
          {
            code: 600,
            msg: `账号或密码不正确`,
          },
          HttpStatus.BAD_REQUEST
        )

      default:
        return { data: [] }
    }
  }

  @NoAuth()
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() body: any) {
    return await this.usersService.register(body)
  }
}
