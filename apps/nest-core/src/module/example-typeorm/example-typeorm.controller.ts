import { ExampleTypeormService } from '@app/nest-core/module/example-typeorm/example-typeorm.service'
import { Controller, Get, Query } from '@nestjs/common'
import { SaveStudentDto } from './dto/save-student.dto'

@Controller('example-typeorm')
export class ExampleTypeormController {
  constructor(private exampleTypeormService: ExampleTypeormService) {}

  @Get('save-classes')
  async saveClasses(@Query() req: SaveStudentDto) {
    try {
      const res = await this.exampleTypeormService.saveClasses(req)
      return { msg: '成功', data: res }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { msg: error.message, code: 400 }
      }
    }
  }
  @Get('get-classes')
  async getClasses(@Query() req: any) {
    const res = await this.exampleTypeormService.getClasses()

    return { data: res }
  }
}
