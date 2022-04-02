import { Inject, Injectable, Scope } from '@nestjs/common'
import { Example2Service } from './example2.service'

// 一般情况下，Provider都有着同应用程序一样的生命周期（根据依赖关系逐个生成，请求完成后再一并销毁）。但是也可以通过一些其他方法来延申其作用域。Nest提供三种周期：
// https://juejin.cn/post/6923020519113490440
// 默认（DEFAULT）：同应用程序周期；
// 请求（REQUEST）：请求处理完成后便被销毁对象；
// 瞬态（TRANSIENT）：每个使用Provider的程序都会得到一个独立的实例；
// 关于作用域这一概念：
// 不局限于Provider应用，控制器在这方面也是同理。由于整个架构都是应用了依赖注入，被依赖方（services）注入到依赖方(controller)，所以被依赖方的作用域将会等于依赖方的作用域。
// 还记得上面那个通过构造函数注入吗？一个新的实例才能才能应对新的构造函数。例如：一个Service是REQUEST作用域的，那么使用它的Controller也是REQUEST作用域。

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ExampleService {
  getHello(): object {
    return { data: 'Hello World!' }
  }
}
