import { HttpExceptionFilter } from './exception.http.filter'

describe('HttpExceptionFilter', () => {
	it('should be defined', () => {
		expect(new HttpExceptionFilter()).toBeDefined()
	})
})
