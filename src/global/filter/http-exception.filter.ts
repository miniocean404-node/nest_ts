import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost): any {
		const ctx = host.switchToHttp() // 获取请求上下文
		const res = ctx.getResponse() // 获取请求上下文中的 response对象
		const status = exception.getStatus() // 获取异常状态码

		// 设置错误信息
		const msg = exception.message ? exception.message : `${status >= 500 ? '服务器错误' : '客户端错误'}`

		const errorResponse = {
			data: {},
			message: msg,
			code: status,
		}

		// 设置返回的状态码， 请求头，发送错误信息
		res.status(status)
		res.header('Content-Type', 'application/json; charset=utf-8')
		res.send(errorResponse)
	}
}
