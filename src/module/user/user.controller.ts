import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

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
