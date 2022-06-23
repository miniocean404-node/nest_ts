import { AuthService } from '@/module/auth/auth.service'
import { default as CustomExceptionError } from '@/utils/exception'
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) {}

	use(req: any, res: any, next: (error?: Error | any) => void) {
		const { headers } = req

		const token = headers.token

		const user = this.authService.decodeToken(token)

		if (!user) {
			throw new CustomExceptionError({ data: 1, code: HttpStatus.UNAUTHORIZED })
		}

		next()
	}
}
