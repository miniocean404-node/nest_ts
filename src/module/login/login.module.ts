import { Module } from '@nestjs/common'

import { UserService } from '@/module/user/user.service'
import { AuthModule } from '@/module/auth/auth.module'

import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
	// 不导入AuthService是因为：AuthService中还使用了JwtService,import会将其一起导入
	imports: [AuthModule],
	controllers: [LoginController],
	providers: [LoginService, UserService],
})
export class LoginModule {}
