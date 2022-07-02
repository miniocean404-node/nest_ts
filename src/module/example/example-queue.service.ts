import { ExampleQueueConsumer } from '@/common/queue-consumer/example-consumer'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { nanoid } from 'nanoid'

@Injectable()
export class ExampleQueueService {
  constructor(@InjectQueue('queue') private queue: Queue) {}

  // 生产者
  async addTask() {
    const job = await this.queue.add(
      'transcode',
      {
        key: 'value',
      },
      {
        // 选项优先级值。范围从 1（最高优先）到 MAX_INT（最低优先）
        priority: 1,
        // 任务执行前等待的时间（毫秒）
        delay: 200,
        // 任务结束前总的尝试次数。
        attempts: 10,
        // 按照定时设置重复任务记录 https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queueadd
        // repeat: {},
        // 如果任务失败，自动重试闪避设置
        backoff: 3,
        // 如果为true，先进先出（默认为 false)。
        lifo: false,
        // 任务超时失败的毫秒数。
        timeout: 3000,
        // 覆盖任务 ID-默认地，任务 ID 是唯一的整数，但你可以使用该参数覆盖它。如果你使用这个选项，你需要保证jobId是唯一的。如果你尝试添加一个包含已有 id 的任务，它不会被添加。
        jobId: nanoid(),
        // 如果为true，当任务完成时移除任务。一个数字用来指定要保存的任务数。默认行为是将完成的工作保存在已完成的设置中
        removeOnComplete: 10,
        // 如果为true，当所有尝试失败时移除任务。一个数字用来指定要保存的任务数。默认行为是将失败的任务保存在已失败的设置中
        removeOnFail: 10,
        // 限制在stacktrace中保存的堆栈跟踪线
        stackTraceLimit: 10,
      }
    )

    const queueConsumer = new ExampleQueueConsumer(this.queue)

    queueConsumer.transcode(job)
  }

  // 暂停队列
  async pause() {
    await this.queue.pause()
  }

  // 恢复队列
  async resume() {
    await this.queue.resume()
  }
}
