require('babel-register')
var node = require('./node').default
var skiff = node(1)
var db = skiff.levelup()