import StudentEntity from '@app/nest-core/db/typeorm-example/student.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExampleTypeormController } from './example-typeorm.controller'
import { ExampleTypeormService } from './example-typeorm.service'
import TeacherEntity from '../../db/typeorm-example/teacher.entity'
import ClassEntity from '@app/nest-core/db/typeorm-example/class.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, TeacherEntity, ClassEntity])],
  controllers: [ExampleTypeormController],
  providers: [ExampleTypeormService],
})
export class ExampleTypeormModule {}
