// src/logical/auth/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

// 校验 账号密码是否和本地的 一致
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super()
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(username, password)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
