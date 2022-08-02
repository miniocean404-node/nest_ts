import StudentEntity from '@app/nest-core/db/typeorm-example/student.entity'
import TeacherEntity from '@app/nest-core/db/typeorm-example/teacher.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('classes')
export default class ClassEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { default: null, length: '255' })
  name?: string

  @OneToMany(() => StudentEntity, (student) => student.classes)
  students: StudentEntity[]

  @OneToMany(() => TeacherEntity, (teachers) => teachers.classes)
  teachers: TeacherEntity[]
}
