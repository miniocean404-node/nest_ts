import { Server } from '@nestjs/microservices'
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Socket } from 'node:net'
import { from, map, Observable } from 'rxjs'

// 链接地址为：http://127.0.0.1:80
@WebSocketGateway(80, {
  transports: ['websocket', 'polling'], // 传输协议
  cors: {
    origin: '*',
  },
})
export class ExampleWebsoketGateway {
  @WebSocketServer()
  server: Server

  // 客户端可以监听的消息名
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): Observable<WsResponse<number>> {
    client.emit('events', '作为客户端发送消息')

    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<string> {
    return `identity 事件返回数据 ${data}`
  }
}
