import { JwtAuthGuard } from '@/common/guard/jwt.auth.guard'
import { LocalAuthGuard } from '@/common/guard/local.auth.guard'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IAuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtGlobalGuard implements CanActivate {
  private readonly reflector: Reflector

  constructor() {
    this.reflector = new Reflector()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const decorated = context.getHandler()

    // 在这里取 metadata 中的no-auth，得到的会是一个 bool
    const noAuth = this.reflector.get<boolean>('no-auth', decorated)

    if (noAuth) {
      return true
    }

    // 获取登录的注解
    const loginAuth = this.reflector.get<boolean>('login-auth', decorated)

    const guard = JwtGlobalGuard.getAuthGuard(loginAuth)
    // 执行所选策略Guard的canActivate方法
    return guard.canActivate(context)
  }

  // 根据NoAuth的t/f选择合适的策略Guard
  private static getAuthGuard(loginAuth: boolean): IAuthGuard {
    if (loginAuth) {
      return new LocalAuthGuard()
    } else {
      return new JwtAuthGuard()
    }
  }
}
