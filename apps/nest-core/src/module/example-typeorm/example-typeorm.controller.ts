import { ExampleTypeormService } from '@app/nest-core/module/example-typeorm/example-typeorm.service'
import { Body, Controller, Get, Query, Req } from '@nestjs/common'
import { SaveStudentDto } from './dto/save-student.dto'

@Controller('example-typeorm')
export class ExampleTypeormController {
  constructor(private exampleTypeormService: ExampleTypeormService) {}
  @Get('save-student')
  async saveStudent(@Query() req: SaveStudentDto) {
    try {
      const res = await this.exampleTypeormService.saveStudent(req)
      return { msg: '成功', data: res }
    } catch (error) {
      return { msg: error }
    }
  }
}
