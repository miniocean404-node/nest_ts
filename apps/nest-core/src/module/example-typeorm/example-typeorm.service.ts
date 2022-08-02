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
  async saveStudent(req: SaveStudentDto): Promise<boolean> {
    const { studentName, className, teacherName } = req

    try {
      const classes = new ClassEntity()
      const teacher = new TeacherEntity()
      const student = new StudentEntity()

      classes.name = className
      classes.teachers = [teacher]
      classes.students = [student]

      teacher.name = teacherName
      teacher.students = [student]
      teacher.classes = [classes]

      student.name = studentName
      student.classes = [classes]
      student.teachers = [teacher]

      console.log(classes, teacher, student)

      await this.dataSource.manager.save(teacher)
      await this.dataSource.manager.save(student)
      await this.dataSource.manager.save(classes)

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
