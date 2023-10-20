import {Result, result, NullError} from '../mod.ts'

/** Option */

const some_tag = Symbol('some')
const none_tag = Symbol('none')

interface opt<T> {
  readonly _tag: typeof some_tag | typeof none_tag
  /** 是否为Some*/
  is_some: boolean
  /** 是否为None */
  is_none: boolean
  /**  获取值,如果为None就抛异 */
  unwarp(): T
  /** 抛异,如果为None就抛异,msg作为错误信息 */
  expect(msg: string): T
  /** 如果为some就执行 */
  some_do(fn: (val: T) => void): void
}
interface Some<T> extends opt<T> {
  readonly _tag: typeof some_tag
  readonly value: T
  unwrap_or(def: T): T
  unwrap_or_else(fn: () => T): T
  map<V>(callback: (value: T) => V): Option<V>
  and_then<V>(callback: (value: T) => Option<V>): Option<V>
  to_result(): Result<T, never>
}
interface None extends opt<never> {
  readonly _tag: typeof none_tag
  /** 如果为None使用def作为默认值插入 */
  unwrap_or<V>(def: V): V
  /** 如果为None使用fn()作为默认值插入 */
  unwrap_or_else<V>(fn: () => V): V
  /** 如果为Some调用callback结果替换Some值 */
  map<V>(callback: (value: never) => V): Option<V>
  /** 如果为Some调用callback进行替换 */
  and_then<V>(callback: (value: never) => Option<V>): Option<V>
  /** 转化为Result类型 */
  to_result(): Result<never, Error>
}

export type Option<T> = Some<T> | None

export function Some<T>(val: T extends null | undefined ? never : T): Option<T> {
  return {
    _tag: some_tag,
    value: val,
    is_some: true,
    is_none: false,
    unwarp() {
      return this.value
    },
    expect(_msg: string) {
      return this.value
    },
    unwrap_or<T>(_def: T) {
      return this.value
    },
    unwrap_or_else(_fn) {
      return this.value
    },
    map<V>(callback: (value: T) => V extends null | undefined ? never : V) {
      return Some(callback(this.value))
    },
    some_do(fn) {
      fn(this.value)
    },
    and_then<V>(callback: (value: T) => Option<V>) {
      return callback(this.value)
    },
    to_result() {
      return result<T, never>(() => {
        return this.value
      })
    },
  }
}

export const None: None = {
  _tag: none_tag,
  is_some: false,
  is_none: true,

  unwarp() {
    throw new NullError()
  },
  expect(msg: string) {
    throw new NullError(msg)
  },
  unwrap_or<T>(def: T) {
    return def
  },
  unwrap_or_else<V>(fn: () => V) {
    return fn()
  },
  map<V>(_callback: (value: V) => V): Option<V> {
    return this
  },
  some_do(_fn) {},
  and_then<V>(_callback: (value: V) => Option<V>) {
    return this
  },
  to_result() {
    return result<never, NullError>(() => {
      throw new NullError()
    })
  },
}

/** 将任意类型转化为Option类型 */
export function option<T>(value: T): Option<T extends null | undefined ? never : T> {
  if (typeof value == 'undefined' || value === null) {
    return None
  } else {
    //@ts-ignore
    return Some(value)
  }
}