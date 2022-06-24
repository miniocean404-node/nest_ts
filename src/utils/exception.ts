import { HttpException, HttpStatus } from '@nestjs/common'

class CustomExceptionError extends HttpException {
	private static readonly message = '自定义错误'

	constructor(private readonly objectOrError: object, private readonly code?: number) {
		const message = CustomExceptionError.message

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
