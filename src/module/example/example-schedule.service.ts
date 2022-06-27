import { Injectable } from '@nestjs/common'
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class ExampleScheduleService {
  // 星号通配符 (也就是 *)
  // 范围（也就是 1-3,5) 例如 几号到几号 的 某个时间执行一次
  // 步长（也就是 */2) // 多久一次
  // * * * * * *	每秒
  // 45 * * * * *	每分钟第 45 秒
  // _ 10 _ * * *	每小时，从第 10 分钟开始
  // 0 _/30 9-17 _ * *	上午 9 点到下午 5 点之间每 30 分钟
  // 0 30 11 * * 1-5	周一至周五上午 11:30

  constructor(private scheduler: SchedulerRegistry) {}

  // second (optional)、minute、hour、day of month、month、day of week
  @Cron('* * * * * *', {
    name: 'EVERY_SECOND',
  })
  handleCron() {
    // getCronJob()方法返回一个命名的定时任务。然后返回一个包含下列方法的CronJob对象：
    // stop()-停止一个按调度运行的任务
    // start()-重启一个停止的任务
    // setTime(time:CronTime)-停止一个任务，为它设置一个新的时间，然后再启动它
    // lastDate()-返回一个表示工作最后执行日期的字符串
    // nextDates(count:number)-返回一个moment对象的数组（大小count)，代表即将执行的任务日期
    const job = this.scheduler.getCronJob('EVERY_SECOND')

    job.stop()

    console.log('停止后最后执行时间', job.lastDate())
    console.log('定时任务 1 秒执行一次')
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'EVERY_HOUR',
  })
  handleEnum() {
    console.log('定时任务 CronExpression.EVERY_5_SECONDS 秒执行一次')
  }

  @Interval('Interval', 1000000)
  handleInterval() {
    console.log('重复执行')
  }

  @Timeout('Timeout', 5000)
  handleTimeout() {
    console.log('延时执行一次')
  }

  // 添加定时任务
  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      console.log('添加的定时任务')
    })

    this.scheduler.addCronJob(name, job)
    job.start()
  }

  // 删除定时任务
  deleteCron(name: string) {
    this.scheduler.deleteCronJob(name)
    console.log(`删除的定时任务 ${name}`)
  }

  // 列出所有定时任务
  getCrons() {
    const jobs = this.scheduler.getCronJobs()
    jobs.forEach((value, key) => {
      let next
      try {
        next = value.nextDates().toISODate()
      } catch (e) {
        // 如果一个工作已经执行了并且没有下一次执行的日期，将抛出异常
        next = '没有下一个执行'
      }
      console.log(`job: ${key} -> next: ${next}`)
    })
  }

  // 获取 Interval 定时任务
  getInterval() {
    const interval = this.scheduler.getInterval('Interval')
    clearInterval(interval)
  }

  // 添加 Interval 定时任务
  addInterval(name: string, seconds: number) {
    const callback = () => {
      console.log(`Interval ${name} executing at time (${seconds})!`)
    }

    const interval = setInterval(callback, seconds)
    this.scheduler.addInterval(name, interval)
  }

  // 删除 Interval 定时任务
  deleteInterval(name: string) {
    this.scheduler.deleteInterval(name)
    console.log(`Interval ${name} deleted!`)
  }

  // 列出所有 Interval 定时任务
  getIntervals() {
    const intervals = this.scheduler.getIntervals()
    intervals.forEach((key) => console.log(`Interval: ${key}`))
  }

  // 获取 Timeout 定时任务
  getTimeout() {
    const timeout = this.scheduler.getTimeout('Timeout')
    clearTimeout(timeout)
  }

  // 添加 Timeout 定时任务
  addTimeout(name: string, seconds: number) {
    const callback = () => {
      console.log(`Timeout ${name} executing after (${seconds})!`)
    }

    const timeout = setTimeout(callback, seconds)
    this.scheduler.addTimeout(name, timeout)
  }

  // 删除 Timeout 定时任务
  deleteTimeout(name: string) {
    this.scheduler.deleteTimeout(name)
    console.log(`Timeout ${name} deleted!`)
  }

  // 列出所有 Timeout 定时任务
  getTimeouts() {
    const timeouts = this.scheduler.getTimeouts()
    timeouts.forEach((key) => console.log(`Timeout: ${key}`))
  }
}
