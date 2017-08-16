// answers - routes\index.js

// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');

// ルーターの作成
var router = express.Router();

// メイン画面の表示(ページ表示)
router.get('/', function(req, res) {
 res.render('index', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
});

module.exports = router;
