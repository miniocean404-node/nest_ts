import { HttpException, HttpStatus } from '@nestjs/common'

class CustomExceptionError extends HttpException {
	constructor(private readonly objectOrError: object, public readonly message = '自定义错误', private readonly code?: number) {
		const errRes = {
			data: null,
			code,
			message,
			timestamp: new Date().getTime(),
			...objectOrError,
		}

		const errCode = code || HttpStatus.OK

		super(HttpException.createBody(errRes, message, errCode), errCode)
	}
}

export default CustomExceptionError
