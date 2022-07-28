import { UserEntity } from '@app/nest-core/db/user.entity'
import { RegisterDto } from '@app/nest-core/module/login/dto/register.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ExampleTypeormService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>
  ) {}

  async find(reqBody: RegisterDto): Promise<UserEntity | null> {
    try {
      const user1 = await this.userRep.findOne({ where: reqBody })
      return user1
    } catch (error) {
      return error
    }
  }
}
