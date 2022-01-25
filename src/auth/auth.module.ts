import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'
import { UserService } from '../user/user.service'

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
