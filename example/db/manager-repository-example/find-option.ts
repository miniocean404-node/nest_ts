import { ArrayContains, Between, Equal, In, LessThan, Like, MoreThan, Not, Raw } from 'typeorm'

async function findOption() {
  const reqBody = null

  // SELECT * FROM "user"
  await this.userRep.find()

  // 只查找一个
  await this.userRep.findOneBy({ username: reqBody.username })

  // SELECT * FROM "post" WHERE "username" = 'user'
  await this.userRep.findBy({
    username: Equal('user'),
  })
}

/*
    将执行一下语句
    SELECT * FROM "user"
    LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
    LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
    LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"

    SELECT * FROM "user"
    LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
    LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
    LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"
    LEFT JOIN "video_attributes" ON "video_attributes"."id" = "videos"."video_attributesId"
*/
function useRelations() {
  this.userRep.find({
    relations: {
      profile: true,
      photos: true,
      videos: true,
    },
  })

  this.userRep.find({
    relations: {
      profile: true,
      photos: true,
      videos: {
        videoAttributes: true,
      },
    },
  })
}

// SELECT "username", "lastName" FROM "user"
// 只查询 select 选中的字段
async function findSelect() {
  await this.userRep.find({ select: { username: true } })
}

async function findWhere() {
  // SELECT * FROM "user" WHERE "firstName" = 'Timber' AND "lastName" = 'Saw'
  await this.userRep.find({ where: { username: 'user' } })

  // SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')
  await this.userRep.find({
    where: [{ username: 'user' }, { username: 'test1' }],
  })

  /*
    从嵌入实体查询列应该根据定义它的层次结构来完成。例子：
    SELECT * FROM "user"
    LEFT JOIN "project" ON "project"."id" = "user"."projectId"
    WHERE "project"."name" = 'TypeORM' AND "project"."initials" = 'abc'
  */
  this.userRep.find({
    relations: {
      project: true,
    },
    where: {
      project: {
        name: 'TypeORM',
        initials: 'abc',
      },
    },
  })
}

// SELECT * FROM "user" ORDER BY "name" ASC, "id" DESC
async function findOrder() {
  await this.userRep.find({
    order: { username: 'ASC', id: 'DESC' },
  })
}

// withDeleted- 包括用softDelete或软删除的实体softRemove，例如设置它们的@DeleteDateColumn列。默认情况下，不包括软删除的实体。
async function findWithDeleted() {
  this.userRep.find({
    withDeleted: true,
  })
}

async function findPagination() {
  // find* 返回多个实体 ( find, findBy, findAndCount, findAndCountBy) 的方法也接受以下选项：
  // skip- 从应该获取实体的位置偏移（分页）。
  // SELECT * FROM "user" OFFSET 5
  this.userRep.find({
    skip: 5,
  })

  // take- 限制（分页） - 应采用的最大实体数。
  // SELECT * FROM "user" LIMIT 10
  this.userRep.find({
    take: 10,
  })

  // skip并且take应该一起使用
  // 如果你在 MSSQL 中使用 typeorm，并且想使用takeor limit，你也需要使用 order ，否则你会收到以下错误：'Invalid usage of the option NEXT in the FETCH statement.'
  // SELECT * FROM "user" ORDER BY "columnName" ASC LIMIT 10 OFFSET 0
  this.userRep.find({
    order: {
      columnName: 'ASC',
    },
    skip: 0,
    take: 10,
  })
}

// cache- 启用或禁用查询结果缓存。有关更多信息和选项，请参阅 https://typeorm.io/caching#
async function useCache() {
  this.userRep.find({
    cache: true,
  })
}

/*
todo 不理解
lock- 启用查询锁定机制。只能在findOne和findOneBy方法中使用。 lock是一个对象，可以定义为：
{ mode: "optimistic", version: number | Date }
{
    mode: "pessimistic_read" |
        "pessimistic_write" |
        "dirty_read" |
        "pessimistic_partial_write" |
        "pessimistic_write_or_fail" |
        "for_no_key_update" |
        "for_key_share"
}
*/
async function useLock() {
  this.userRep.findOne({
    where: {
      id: 1,
    },
    lock: { mode: 'optimistic', version: 1 },
  })
}

// 完整演示
async function useComplete() {
  this.userRep.find({
    select: {
      firstName: true,
      lastName: true,
    },
    relations: {
      profile: true,
      photos: true,
      videos: true,
    },
    where: {
      firstName: 'Timber',
      lastName: 'Saw',
      profile: {
        userName: 'tshaw',
      },
    },
    order: {
      name: 'ASC',
      id: 'DESC',
    },
    skip: 5,
    take: 10,
    cache: true,
  })
}

// SELECT * FROM "post" WHERE "title" != 'About #1'
async function useNot() {
  await this.userRep.findBy({
    username: Not('About #1'),
  })
}

// SELECT * FROM "post" WHERE "id" < 10
// LessThan <
// LessThanOrEqual <=
// MoreThan >
// MoreThanOrEqual >=
// Equal =
async function useLessThan() {
  await this.userRep.findBy({
    id: LessThan(10),
  })
}

// Like: SLikeELECT * FROM "post" WHERE "username" LIKE '%out #%'
// ILike: SLikeELECT * FROM "post" WHERE "username" ILike '%out #%'
async function useLike() {
  await this.userRep.findBy({
    username: Like('user'),
  })
}

// SELECT * FROM "post" WHERE "id" BETWEEN 1 AND 10
async function useBetween() {
  await this.userRep.findBy({
    id: Between(1, 10),
  })
}

async function useInAnyIsNull() {
  // In: SELECT * FROM "post" WHERE "username" IN ('About #2','About #3')
  // Any: SELECT * FROM "post" WHERE "username" = ANY(['About #2','About #3'])
  // IsNull: SELECT * FROM "post" WHERE "username" IS NULL
  await this.userRep.findBy({
    username: In(['About #2', 'About #3']),
  })
}

// ArrayContains: SELECT * FROM "post" WHERE "username" @> '{TypeScript 1}'
// ArrayContainedBy: SELECT * FROM "post" WHERE "username" <@ '{TypeScript 1}'
// ArrayOverlap: SELECT * FROM "post" WHERE "username" && '{TypeScript 1}'
async function useArrayContains() {
  await this.userRep.findBy({
    username: ArrayContains(['TypeScript 1']),
  })
}

// Raw('dislikes - 4'): SELECT * FROM "post" WHERE "username" = "dislikes" - 4
// Raw((alias) => `${alias} > NOW()`): SELECT * FROM "post" WHERE "username" > NOW()
// Raw((alias) => `${alias} > :date`, { date: '2020-10-06' }): SELECT * FROM "post" WHERE "username" > '2020-10-06'

// username: Raw((alias) => `${alias} IN (:...titles)`, {
//   usernames: ['Go To Statement Considered Harmful', 'Structured Programming'],
// }),
// SELECT * FROM "post" WHERE "usernames" IN ('Go To Statement Considered Harmful', 'Structured Programming')
async function useRaw() {
  await this.userRep.findBy({
    username: Raw('dislikes - 4'),
  })

  // SELECT * FROM "post" WHERE NOT("id" > 10) AND NOT("username" = 'About #2')
  await this.userRep.findBy({
    id: Not(MoreThan(10)),
    username: Not(Equal('About #2')),
  })
}

// SELECT * FROM "post" WHERE NOT("likes" > 10) AND NOT("title" = 'About #2')
async function useCombineAdvanced() {
  const dataSource = null
  const Post = null

  await dataSource.getRepository(Post).findBy({
    likes: Not(MoreThan(10)),
    title: Not(Equal('About #2')),
  })
}
