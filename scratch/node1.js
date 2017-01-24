require('babel-register')
var node = require('./node').default
var skiff = node(0)
var db = skiff.levelup()
