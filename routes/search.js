// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');

// ルーターの作成
var router = express.Router();

console.log('OK');

module.exports = router;