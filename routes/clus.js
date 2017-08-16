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

// クラスター確認画面の表示(ページ表示)
router.get('/', function(req, res) {
 res.render('clus', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
});

// クラスター確認
router.post('/list', function(req, res) {
var params = {
  username: req.body.u,
  password: req.body.p,
  version: 'v1'
}

var retrieve_and_rank = watson.retrieve_and_rank(params);

retrieve_and_rank.listClusters({},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      return res.status(200).send(JSON.stringify(response));
      console.log(JSON.stringify(response, null, 2));
});

retrieve_and_rank.listRankers({},
  function(err, response) {
    if (err)
      console.log('error: ', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
});

module.exports = router;
