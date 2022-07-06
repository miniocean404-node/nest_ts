import { ExampleTypeormService } from '@app/nest-core/module/example-typeorm/example-typeorm.service'
import { Controller, Get } from '@nestjs/common'

@Controller('example-typeorm')
export class ExampleTypeormController {
  constructor(private exampleTypeormService: ExampleTypeormService) {}
  @Get('one-to-one')
  async oneToOne() {
    const res = await this.exampleTypeormService.find({ username: 'root' })

    return { msg: '成功', data: res }
  }
}
