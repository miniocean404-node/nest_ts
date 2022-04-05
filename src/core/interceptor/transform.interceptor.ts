import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(({ data, msg, code }) => {
				return {
					data,
					code: code || 200,
					msg: msg || '请求成功',
				}
			})
		)
	}
}
