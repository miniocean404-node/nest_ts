import { IsNotEmpty } from 'class-validator'

export class SaveStudentDto {
  @IsNotEmpty({ message: '学生信息必填' })
  readonly studentName?: string

  @IsNotEmpty({ message: '班级信息必填' })
  readonly className?: string

  @IsNotEmpty({ message: '班级信息必填' })
  readonly teacherName?: string
}
