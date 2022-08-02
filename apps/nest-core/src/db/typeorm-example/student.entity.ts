import TeacherEntity from '@app/nest-core/db/typeorm-example/teacher.entity'
import ClassEntity from '@app/nest-core/db/typeorm-example/class.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('student')
export default class StudentEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { default: null, length: '255' })
  name?: string

  @JoinTable()
  @ManyToMany(() => TeacherEntity)
  teachers: TeacherEntity[]

  @ManyToOne(() => ClassEntity, (classes) => classes.students)
  classes: ClassEntity[]
}
