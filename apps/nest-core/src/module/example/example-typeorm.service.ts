import ClassEntity from '@app/nest-core/db/typeorm-example/class.entity'
import StudentEntity from '@app/nest-core/db/typeorm-example/student.entity'
import TeacherEntity from '@app/nest-core/db/typeorm-example/teacher.entity'
import { SaveStudentDto } from '@app/nest-core/module/example/dto/save-student.dto'
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

  // 保存班级
  async saveClasses(req: SaveStudentDto): Promise<boolean | Error> {
    const { studentName, className, teacherName } = req

    try {
      const classes = new ClassEntity()
      const teacher = new TeacherEntity()
      const student = new StudentEntity()

      // 先存各个表的数据，然后再存储关系
      teacher.name = teacherName
      student.name = studentName
      classes.name = className
      await this.dataSource.manager.save(student)
      await this.dataSource.manager.save(teacher)
      await this.dataSource.manager.save(classes)

      classes.students = [student]
      classes.teachers = [teacher]
      await this.dataSource.manager.save(classes)

      teacher.students = [student]
      teacher.classes = classes
      await this.dataSource.manager.save(teacher)

      student.classes = classes
      student.teachers = [teacher]
      await this.dataSource.manager.save(student)
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getClasses() {
    const res = await this.studentRep.find({
      relations: {
        teachers: true,
        classes: true,
      },
      where: {
        name: '学生1',
      },
    })

    return res
  }
}
