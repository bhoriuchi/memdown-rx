import Skiff from 'skiff'
import rethinkdbdash from 'rethinkdbdash'
import rethinkdown from 'rethinkdown'

let state = null
let loc = '/ip4/127.0.0.1/tcp/9490'
let peers = []

const options = {
  db: rethinkdown(rethinkdbdash, 'raft'),
  location: 'raft',
  peers
}
const skiff = Skiff(loc, options)
const db = skiff.levelup()

db.on('put', console.log)

skiff.start((err) => {
  if (err) return console.error(err)
  console.log('Skiff server started')
})

skiff.on('new state', (s) => {
  if (s === state) return
  state = s
  console.log(`Became a ${s}`)
})