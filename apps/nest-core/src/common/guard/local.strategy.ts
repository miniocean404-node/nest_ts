import CustomExceptionError from '@app/nest-core/common/filter/exception.custom'
import { AuthService } from '@app/nest-core/module/auth/auth.service'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

// 校验 账号密码是否和本地的 一致
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)

    if (!user) throw new CustomExceptionError({ msg: '用户校验失败' }, 400)

    return user
  }
}
