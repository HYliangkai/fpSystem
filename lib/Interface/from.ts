/** ## From : 提供不同类型转化的接口
@explain type`T`  - form<T,F> -> type`F`
@example
```ts
  const AstrConstructor: From<Cstr, Astr> = {
    from(val: Cstr): Astr {
      return new Astr(Number(val.str))
    },
  }
  class Astr {
    constructor(public str: number) {}
  }

  const CstrConstructor: From<Astr, Cstr> = {
    from(val: Astr): Cstr {
      return new Cstr(String(val.str), 18)
    },
  }
  class Cstr {
    constructor(public str: string, private age: number) {}
  }

  assert(AstrConstructor.from(new Cstr('18', 18)) instanceof Astr)
  assert(CstrConstructor.from(new Astr(18)) instanceof Cstr)
```
@category Interface
 */
export interface From<T, F> {
  from(val: T): F
}
