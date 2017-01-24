import EventEmitter from 'events'
import levelup from 'levelup'
import memdown from 'memdown'
import Rx from 'rx'

class MemDOWNRx extends EventEmitter {
  constructor (location, options = {}) {
    super()
    if (typeof location !== 'string' || !location.length) throw new Error('invalid location')
    this._location = location
    this._options = options
    this._db = levelup(this._location, { db: memdown })

    // copy each method
    for (const name in Object.getPrototypeOf(this._db)) {
      let method = this._db[name]
      if (typeof method === 'function') {
        this[name] = function () {
          return method.apply(this._db, [...arguments])
        }
      }
    }
  }

  get db () {
    return this._db
  }
}

function MemRx (location, options) {
  return new MemDOWNRx(location, options)
}

MemRx.MemDOWNRx = MemDOWNRx

export default MemRx