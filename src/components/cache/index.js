import NodeCache from 'node-cache'

export default class Cache {
  constructor (ttlSeconds) {
    this.cache = NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false })
  }

  get (key, field) {
    let value
    if (field) {
      value = this.cache.get(key[field])
    } else {
      value = this.cache.get(key)
    }
    if (value) {
      return Promise.resolve(value)
    }
    return false
  }

  set (key, result, field) {
    if (field) {
      this.cache.set(key[field], result)
    } else {
      this.cache.set(key, result)
    }
    return result
  }

  flush () {
    this.cache.flushAll()
  }

  del (keys) {
    this.cache.del(keys)
  }
}
