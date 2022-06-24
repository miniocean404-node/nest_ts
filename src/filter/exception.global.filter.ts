import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

// 全局异常处理
@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const exceptionStr = exception
      ? `\r\n\t方法:${request.method}\r\n\t请求地址${request.url}\r\n\t请求体${JSON.stringify(request.body)}\r\n\t错误消息:${
          exception['message']
        },\r\n栈:${exception['stack']}`
      : ''

    console.log('全局异常日志： %s %s %s error: %s', exceptionStr)

    response.status(status).json({
      data: null,
      code: status,
      message: exception['message'],
      timestamp: new Date().getTime(),
    })
  }
}
