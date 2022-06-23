import { JWT_EXPIRES_IN, JWT_SECRET } from '@/constant/jwt'
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
		// 设置默认的 passport 策略
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: JWT_SECRET,
			signOptions: { expiresIn: JWT_EXPIRES_IN }, // token 过期时效
		}),
	],
	providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
	exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
