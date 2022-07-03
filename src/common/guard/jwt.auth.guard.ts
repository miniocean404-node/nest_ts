///jwt.auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session

    return super.canActivate(context)
  }
}
