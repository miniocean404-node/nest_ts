import { Module } from '@nestjs/common'
import { CsrfController } from './csrf.controller'

@Module({
	controllers: [CsrfController],
	providers: [],
})
export class CsrfModule {}
