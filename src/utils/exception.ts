import { HttpException } from '@nestjs/common'

class CustomExceptionTest extends HttpException {
	constructor(private readonly res, private readonly s) {
		super(res, s)
	}
	// initMessage(): void {
	// 	throw new Error('Method not implemented.')
	// }
	// initName(): void {
	// 	throw new Error('Method not implemented.')
	// }
	// getResponse(): string | object {
	// 	throw new Error('Method not implemented.')
	// }
	// getStatus(): number {
	// 	throw new Error('Method not implemented.')
	// }
	// name: string
	// message: string
	// stack?: string
}

export default CustomExceptionTest
