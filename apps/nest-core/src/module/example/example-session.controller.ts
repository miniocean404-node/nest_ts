import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { Controller, Get, Req } from '@nestjs/common'
import express from 'express'

// 读取 session
@Controller('example-session')
export class ExampleSessionController {
  @Get()
  @NoAuth()
  findAll(@Req() req: express.Request) {
    console.log(req.session, req.cookies)

    req.session['visits'] = req.session['visits'] ? req.session['visits'] + 1 : 1
  }
}
