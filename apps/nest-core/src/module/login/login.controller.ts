import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { LocalAuthGuard } from '@app/nest-core/common/guard/local.auth.guard'
import { LocalStrategy } from '@app/nest-core/common/guard/local.strategy'
import { AuthService } from '@app/nest-core/module/auth/auth.service'
import { LoginDto } from '@app/nest-core/module/login/dto/login.dto'
import { RegisterDto } from '@app/nest-core/module/login/dto/register.dto'
import { UserService } from '@app/nest-core/module/user/user.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('登录注册')
@Controller('login')
export class LoginController {
  constructor(
    private readonly usersService: UserService,
    // 使用 AuthService 校验用户
    private readonly authService: AuthService,
    // 使用 LocalStrategy 校验
    private readonly localStrategy: LocalStrategy
  ) {}

  /**
   * 登录获取 token
   * @param param0
   * @returns
   */
  @NoAuth()
  @Post('login')
  @UseGuards(LocalAuthGuard) // 使用 'Local' 进行验证 方式 1
  // @UseGuards(AuthGuard('local')) // 使用 'Local' 进行验证 方式 2
  async login(@Body() { username, password }: LoginDto) {
    // 使用 'Local' 进行验证 方式 3
    const user = await this.localStrategy.validate(username, password)
    const token = await this.authService.certificate(user)

    return { data: { Authorization: `bearer ${token}` } }
  }

  /**
   * 注册
   * @param body
   * @returns
   */
  @NoAuth()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.usersService.register(body)
  }
}
