import { NoAuth } from '@/common/decorator/custom'
import { Controller, Get, Res, StreamableFile } from '@nestjs/common'
import { createReadStream } from 'fs'
import { join } from 'path'

@Controller('example-stream')
export class ExampleStreamController {
  @Get('stream')
  @NoAuth()
  getFile(@Res({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'))

    // 返回的默认类型是 application/octet-stream，如果你需要自定义响应类型，你可以使用 res.set 方法。
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    })
    return new StreamableFile(file)
  }
}
