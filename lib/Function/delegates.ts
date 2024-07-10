import { Fns } from '../../mod.ts'

/** ## delegates : 使用运算符重载实现的事件委托
@warn 实验性质,不予生产使用
@example
```ts
  const ACall = delegates()
  const call1 = function () { return 'call1' }
  const call2 = () => 'call2'

  //基本的运算符重载
  ACall.onclick += call1
  ACall.onclick += call2
  assertEquals(ACall.onclick(), ['call1', 'call2'])

  ACall.onclick -= call1 as any
  assertEquals(ACall.onclick(), ['call2'])

  //事件继承
  ACall.onbulr += ACall.onclick
  assertEquals(ACall.onclick(), ['call2'])

  ACall.onclick -= ACall.onclick
  assertEquals(ACall.onclick(), [])
```
@category Function
*/
const delegates = (() => {
  const global_delegates: Fns<any>[] = []

  Function.prototype.valueOf = function (): number {
    const self = this as Fns<any> & { global_index: number | undefined }
    if (self.global_index !== undefined) return self.global_index
    const index = global_delegates.length
    Object.defineProperty(this, 'global_index', {
      get(): number {
        return index //存储创建时候的索引值
      },
    })
    global_delegates.push(this as any)
    return index
  }

  return function delegates(): Record<string | number | symbol, any> {
    const handlers: Record<string | number | symbol, Array<Fns<any>>> = {}
    const callers: Record<string | number | symbol, Fns<any>> = {}
    return new Proxy(
      {},
      {
        //当进行属性访问的时候调用 , 返回一个遍历执行handlers[key]的函数
        get(target, key): any {
          handlers[key] ??= []
          return (callers[key] ??= function (...args: unknown[]): any {
            return handlers[key]?.map((fn: Fns<any>) => fn(...args))
          })
        },

        /**
        该方法会拦截目标对象的以下操作：
        + 指定属性值：proxy[foo] = bar 和 proxy.foo = bar
        + 指定继承者的属性值：Object.create(proxy)[foo] = bar
        + Reflect.set()
        */
        set(target, p, newvalue): any {
          switch (typeof newvalue) {
            case 'function': {
              const event = (handlers[p] ??= [])
              event.push(newvalue)
              return true
            }
            case 'number': {
              const event_index = callers[p].valueOf() as number
              const delegate = global_delegates[Math.abs(newvalue - event_index)]
              if (delegate == null) return false
              if (newvalue > event_index) {
                handlers[p].push(delegate)
              } else {
                handlers[p].splice(
                  handlers[p].findIndex((fn: Fns<any>) => fn === delegate),
                  1
                )
              }
              return true
            }
            default: {
              return false
            }
          }
        },
      }
    ) as Record<string | number | symbol, any>
  }
})()
