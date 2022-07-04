import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { Controller, MessageEvent, Sse } from '@nestjs/common'
import { interval, map, Observable } from 'rxjs'

// 服务器端事件发送路径必须返回 Observable 流
// 服务器端事件发送(SSE)是一个服务器推送技术，用来使客户端在HTTP连接下自动接收服务器更新消息。每个消息以一个由一对新行符号作为结束的文字块发送
// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
@Controller('example-sse')
export class ExampleSseController {
  @Sse('sse')
  @NoAuth()
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } })))
  }
}

// 浏览器端
// const eventSource = new EventSource('http://127.0.0.1:3000/api/nest/v1/example-sse/sse')
// eventSource.onmessage = ({ data }) => {
//   console.log('New message', JSON.parse(data))
// }
