import {LazyArray} from 'lib'

/** LazyArray的主要应用场景 : 
  1.需要数组操作后take操作 : 譬如表格有1000行数据但是需要取满足特定操作后的前20行数据,使用LazyArray能提供快一倍的性能
 */

const test = [
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
  1,
  2,
  3,
  '四',
  5,
  6,
  7,
  8,
  9,
  '10',
  '十一',
  12,
  '十三',
  '十四',
  '十五',
]
Deno.bench({
  name: 'no-lazy',
  fn() {
    const res = test
      .filter(item => !isNaN(Number(item)))
      .map(item => (item as number) * 2)
      .filter(item => item > 10)
      .slice(0, 30)
  },
})
Deno.bench({
  name: 'lazy',
  fn() {
    const res = LazyArray.of(test)
      .filter(item => !isNaN(Number(item)))
      .map(item => (item as number) * 2)
      .filter(item => (item as number) > 10)
      .take(30)
      .value()
  },
})
