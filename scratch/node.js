import Skiff from 'skiff'
import memdown from 'memdown'
import rethinkdbdash from 'rethinkdbdash'
import rethinkdown from 'rethinkdown'
import _ from 'lodash'
import peerList from './peer-list'

export default function node (id) {
  let state = null
  let loc = _.first(_.filter(peerList, (peer) => peer.match(new RegExp(`${id}$`)) !== null))
  let peers = _.filter(peerList, (peer) => peer.match(new RegExp(`${id}$`)) === null)

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

  return skiff
}