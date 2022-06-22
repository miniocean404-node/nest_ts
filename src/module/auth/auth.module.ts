import { expiresIn, secret } from '@/constant/jwt'
// 其他模块
import { UserService } from '@/module/user/user.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
// 本文件夹
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: secret,
			signOptions: { expiresIn }, // token 过期时效
		}),
	],
	providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
