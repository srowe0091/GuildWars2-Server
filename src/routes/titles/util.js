import { keyBy, map, assign } from 'lodash/fp'

export const mergeIds = (data, ids) => new Promise(resolve => {
  const _titles = keyBy('id')(ids)
  const merged = map(c => assign(c, { achievements: map(a => _titles[a])(c.achievements) }))(data)
  resolve(merged)
})