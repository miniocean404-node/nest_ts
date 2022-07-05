import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, MessagePattern, NatsContext, Payload } from '@nestjs/microservices'
import { from, Observable } from 'rxjs'

@Controller('example-microservice-base')
export class ExampleMicroserviceBaseController {
  @MessagePattern({ cmd: 'hello' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b)
  }

  // 返回 Rx Observable，因此这些值将被发出，直到流完成
  @MessagePattern({ cmd: 'hello2' })
  observableAccumulate(data: number[]): Observable<number> {
    return from([1, 2, 3])
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    return data.msg
  }

  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`) // e.g. "time.us.east"
    return new Date().toLocaleTimeString()
  }
}
