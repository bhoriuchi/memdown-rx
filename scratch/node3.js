require('babel-register')
var node = require('./node').default
var skiff = node(2)
var db = skiff.levelup()
setTimeout(() => {
  db.put('1', 'test', (err) => {
    if (err) return console.log('put error')
    console.log('put success')
  })
  console.log(skiff.stats())
}, 2000)