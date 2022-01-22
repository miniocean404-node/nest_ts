import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(): object {
    return { data: 'Hello World!' };
  }
}
