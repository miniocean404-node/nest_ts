import { NoAuth } from '@/common/decorator/custom'
import { ExampleEvent } from '@/common/event/example.event'
import { Controller, Get } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'

@Controller('example-event')
export class ExampleEventController {
  constructor(private event: EventEmitter2) {}

  @Get()
  @NoAuth()
  send() {
    this.event.emit(
      'order.created',
      new ExampleEvent({
        orderId: 1,
        payload: {},
      })
    )
  }

  // 事件监听器
  // 一个参数可以是字符串或者符号，在通配的事件发射器中，可以是字符串|符号|数组<字符串|符号>。
  // 第二个参数（可选的）是一个监听器的选项对象 https://github.com/EventEmitter2/EventEmitter2#emitteronevent-listener-options-objectboolean
  @OnEvent('order.created', { async: true })
  handleExample(payload: ExampleEvent) {
    console.log('事件监听 order.created', payload)
  }

  // 要使用命名空间或者通配符，传递wildcard选项到EventEmitterModule#forRoot()方法中。
  // 当命名空间/通配符启用时，事件可以是句点隔开的(foo.bar)形式或者数组(['foo','bar'])，
  // 句点也可以配置为一个配置属性(delimiter)。命名空间启用时，你可以使用通配符订阅事件

  // 这样的通配符仅对一个块有效。参数order.*将匹配例如order.creted和order.shipped事件，但不会匹配order.delayed.out_of_stock。要监听这样的事件，使用多层通配符模式（例如**)
  @OnEvent('order.*')
  handleExample2(payload: ExampleEvent) {
    console.log('事件监听 order.*', payload)
  }
}
