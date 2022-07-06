import { UserEntity } from '@app/nest-core/db/user.entity'
import { RegisterDto } from '@app/nest-core/module/login/dto/register.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArrayContains, Between, Equal, In, LessThan, Like, MoreThan, Not, Raw, Repository } from 'typeorm'

@Injectable()
export class ExampleTypeormService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>
  ) {}

  async find(reqBody: RegisterDto): Promise<UserEntity | null> {
    try {
      // SELECT * FROM "user"
      await this.userRep.find()

      const user1 = await this.userRep.findOne({ where: reqBody })
      await this.userRep.findOneBy({ username: reqBody.username })

      // SELECT "username", "lastName" FROM "user"
      // 只查询 select 选中的字段
      await this.userRep.find({ select: { username: true } })

      // SELECT * FROM "user" WHERE "firstName" = 'Timber' AND "lastName" = 'Saw'
      await this.userRep.find({ where: { username: 'user' } })

      // SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')
      await this.userRep.find({
        where: [{ username: 'user' }, { username: 'test1' }],
      })

      // SELECT * FROM "user" ORDER BY "name" ASC, "id" DESC
      await this.userRep.find({
        order: { username: 'ASC', id: 'DESC' },
      })

      // SELECT * FROM "user" OFFSET 0 LIMIT 10
      // 偏移 0 个数据 限制只查 10 条数据
      await this.userRep.find({
        skip: 0,
        take: 10,
        cache: true, // 开启缓存
      })

      // SELECT * FROM "post" WHERE "title" != 'About #1'
      await this.userRep.findBy({
        username: Not('About #1'),
      })

      // SELECT * FROM "post" WHERE "id" < 10
      // LessThan <
      // LessThanOrEqual <=
      // MoreThan >
      // MoreThanOrEqual >=
      await this.userRep.findBy({
        id: LessThan(10),
      })

      // SELECT * FROM "post" WHERE "username" = 'user'
      await this.userRep.findBy({
        username: Equal('user'),
      })

      // Like: SLikeELECT * FROM "post" WHERE "username" LIKE '%out #%'
      // ILike: SLikeELECT * FROM "post" WHERE "username" ILike '%out #%'
      await this.userRep.findBy({
        username: Like('user'),
      })

      // SELECT * FROM "post" WHERE "id" BETWEEN 1 AND 10
      await this.userRep.findBy({
        id: Between(1, 10),
      })

      // In: SELECT * FROM "post" WHERE "username" IN ('About #2','About #3')
      // Any: SELECT * FROM "post" WHERE "username" = ANY(['About #2','About #3'])
      // IsNull: SELECT * FROM "post" WHERE "username" IS NULL
      await this.userRep.findBy({
        username: In(['About #2', 'About #3']),
      })

      // ArrayContains: SELECT * FROM "post" WHERE "username" @> '{TypeScript 1}'
      // ArrayContainedBy: SELECT * FROM "post" WHERE "username" <@ '{TypeScript 1}'
      // ArrayOverlap: SELECT * FROM "post" WHERE "username" && '{TypeScript 1}'
      await this.userRep.findBy({
        username: ArrayContains(['TypeScript 1']),
      })

      // Raw('dislikes - 4'): SELECT * FROM "post" WHERE "username" = "dislikes" - 4
      // Raw((alias) => `${alias} > NOW()`): SELECT * FROM "post" WHERE "username" > NOW()
      // Raw((alias) => `${alias} > :date`, { date: '2020-10-06' }): SELECT * FROM "post" WHERE "username" > '2020-10-06'

      // username: Raw((alias) => `${alias} IN (:...titles)`, {
      //   usernames: ['Go To Statement Considered Harmful', 'Structured Programming'],
      // }),
      // SELECT * FROM "post" WHERE "usernames" IN ('Go To Statement Considered Harmful', 'Structured Programming')
      await this.userRep.findBy({
        username: Raw('dislikes - 4'),
      })

      // SELECT * FROM "post" WHERE NOT("id" > 10) AND NOT("username" = 'About #2')
      await this.userRep.findBy({
        id: Not(MoreThan(10)),
        username: Not(Equal('About #2')),
      })

      return user1
    } catch (error) {
      return error
    }
  }
}
