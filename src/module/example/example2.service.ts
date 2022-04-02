import { Injectable, Scope } from '@nestjs/common'

export class Example2Service {
  getHello(): object {
    return { data: 'Hello World!' }
  }
}
