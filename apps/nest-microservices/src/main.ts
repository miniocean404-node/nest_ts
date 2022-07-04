import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestMicroservicesModule } from './nest-microservices.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NestMicroservicesModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4000,
      retryAttempts: 3, // 连接尝试的总数
      retryDelay: 3000,
    },
  })

  app.listen()
}
bootstrap()
