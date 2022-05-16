import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(({ data, msg, code }) => {
				return {
					data: data || null,
					code: code || 200,
					msg: msg || '请求成功',
				}
			})
		)
	}
}
