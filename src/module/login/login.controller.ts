import { AuthService } from '@/module/auth/auth.service'
import { UserService } from '@/module/user/user.service'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginService } from './login.service'

@ApiTags('登录')
@Controller('login')
export class LoginController {
	constructor(
		private readonly service: LoginService,
		private readonly usersService: UserService,
		private readonly authService: AuthService
	) {}

	// JWT验证 - Step 1: 用户请求登录
	@Post('login')
	async login(@Body() loginParma: any) {
		console.log('JWT验证 - Step 1: 用户请求登录')

		const authResult = await this.authService.validateUser(loginParma.username, loginParma.password)

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
					code: 500,
					msg: `查无此人`,
				}
		}
	}

	@Post('register')
	async register(@Body() body: any) {
		return await this.usersService.register(body)
	}
}
