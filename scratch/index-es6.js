import memdown from 'memdown'
import Rx from 'rx'
import Skiff from 'skiff'


function storeRoot (s) {
  let keys = Object.keys(s._db._leveldown._db._store)
  return s._db._leveldown._db._store[keys[0]]
}

const options = {
  db: memdown
}

const skiff = Skiff('/ip4/127.0.0.1/tcp/9490', options)
const db = skiff.levelup()

skiff.start((err) => {
  if (err) return console.error(err)
  console.log('Started skiff')
})

skiff.on('leader', () => {
  db.createReadStream().on('data', console.log)
  db.put('1', { stuff: true })
  db.get('1', (err, val) => {
    if (err) return console.error(err)
    console.log(val)
  })
})
