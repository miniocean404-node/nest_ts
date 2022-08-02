import ClassEntity from '@app/nest-core/db/typeorm-example/class.entity'
import StudentEntity from '@app/nest-core/db/typeorm-example/student.entity'
import TeacherEntity from '@app/nest-core/db/typeorm-example/teacher.entity'
import { SaveStudentDto } from '@app/nest-core/module/example-typeorm/dto/save-student.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class ExampleTypeormService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRep: Repository<StudentEntity>,

    private readonly dataSource: DataSource
  ) {}

  // 保存学生
  async saveStudent(req: SaveStudentDto): Promise<boolean | Error> {
    return false
  }

  // 保存班级
  async saveClasses(req: SaveStudentDto): Promise<boolean | Error> {
    const { studentName, className, teacherName } = req

    try {
      const classes = new ClassEntity()
      const teacher = new TeacherEntity()
      const student = new StudentEntity()

      teacher.name = teacherName
      teacher.classes = classes

      student.name = studentName
      student.classes = classes

      classes.name = className

      await this.dataSource.manager.save(classes)
      await this.dataSource.manager.save(student)
      await this.dataSource.manager.save(teacher)

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
