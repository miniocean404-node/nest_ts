import { HttpException, HttpStatus } from '@nestjs/common'

class CustomExceptionError extends HttpException {
	constructor(objectOrError: object, message = '自定义错误', code?: number) {
		const errRes = {
			data: null,
			code,
			message,
			timestamp: new Date().getTime(),
			...objectOrError,
		}

		super(HttpException.createBody(errRes, message, code || HttpStatus.BAD_REQUEST), code || HttpStatus.BAD_REQUEST)
	}
}

export default CustomExceptionError
