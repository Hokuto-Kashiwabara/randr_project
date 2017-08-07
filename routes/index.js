// answers - routes\index.js

// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');

// ルーターの作成
var router = express.Router();

//watson R&Rクラスター接続確認
var retrieve_and_rank = watson.retrieve_and_rank({
  username: '8e15a2cb-4a85-4ee4-8894-c1ee4436c686',
  password: 'T3Btu4vegwaA',
  version: 'v1'
});

retrieve_and_rank.listClusters({},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

retrieve_and_rank.listRankers({},
  function(err, response) {
    if (err)
      console.log('error: ', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

// メイン画面の表示(ページ表示)
router.get('/', function(req, res) {
 res.render('index', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
});


// 検索ボタン
router.get('/answer/:q', function(req, res) {

var params = {
  cluster_id: 'scfca104ca_290c_4b61_8d07_f0082d7a9c22',
  collection_name: 'DataSP'
};

// Get a Solr client for indexing and searching documents.
// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

var ranker_id = '7ff711x34-rank-525';
var question  = req.params.q;
question = encodeURIComponent(question);
var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,title,body'}); //bodyで中身表示

solrClient.get('fcselect', query, function(err, searchResponse) {
  if(err) {
    console.log('Error searching for documents: ' + err);
  }
    else {
      console.log(JSON.stringify(searchResponse.response.docs, null, 2));
      var response = { answer: searchResponse.response.docs[0].body,
            message: '回答が見つかりました。' };
        return res.status(200).send(JSON.stringify(response));
    }
});
});

// // (3)既存メモの編集(ダイアログ表示)
// router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
//  var id = req.param('id');

// memo.get(id, function(err, doc) {
//  res.render('dialog', { id : id, doc : doc });
//  });
// });

// // (4)新規メモの保存
// router.post('/memos', function(req, res) {
//  var id = uuid.v4();
//  var doc = {
//  title : req.body.title,
//  content : req.body.content,
//  updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
//  };

// memo.save(id, doc, function(err) {
//  res.redirect('/');
//  });
// });

// // (5)既存メモの保存
// router.put('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
//  var id = req.param('id');
//  var doc = {
//  title : req.body.title,
//  content : req.body.content,
//  updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
//  };

// memo.save(id, doc, function(err) {
//  res.redirect('/');
//  });
// });

// // (6)既存メモの削除
// router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
//  var id = req.param('id');

// memo.remove(id, function(err) {
//  res.redirect('/');
//  });
// });

module.exports = router;