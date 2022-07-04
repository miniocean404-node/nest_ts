import { Injectable } from '@nestjs/common';

@Injectable()
export class NestMicroservicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
