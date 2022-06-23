import { AuthService } from '@/module/auth/auth.service'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class JwtMiddleware<TRequest = any, TResponse = any> implements NestMiddleware {
	constructor(private readonly authService: AuthService) {}
	use(req: any, res: TResponse, next: (error?: Error | any) => void) {
		const { headers } = req

		const token = headers.token

		const user = this.authService.decodeToken(token)

		if (!user) {
			throw new Error('没有权限')
		}

		next()
	}
}
