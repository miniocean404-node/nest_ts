import { UserEntity } from '@app/nest-core/db/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExampleTypeormController } from './example-typeorm.controller'
import { ExampleTypeormService } from './example-typeorm.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ExampleTypeormController],
  providers: [ExampleTypeormService],
})
export class ExampleTypeormModule {}
