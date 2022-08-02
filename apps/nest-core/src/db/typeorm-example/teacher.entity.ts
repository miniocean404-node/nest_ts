import ClassEntity from '@app/nest-core/db/typeorm-example/class.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import StudentEntity from './student.entity'

@Entity('teacher')
export default class TeacherEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { default: null, length: '255' })
  name?: string

  @JoinTable()
  @ManyToMany(() => StudentEntity)
  students: StudentEntity[]

  @ManyToOne(() => ClassEntity, (classes) => classes.teachers)
  classes: ClassEntity[]
}
