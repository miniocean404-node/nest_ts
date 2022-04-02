import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from '../auth/auth.service'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() body: any) {
    return await this.service.register(body)
  }
}
