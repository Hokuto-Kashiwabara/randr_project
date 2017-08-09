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

// 検索ボタン
router.get('/answer/:q', function(req, res) {

var params = {
  username: "8e15a2cb-4a85-4ee4-8894-c1ee4436c686",
  password: "T3Btu4vegwaA",
  version: 'v1'
}

var retrieve_and_rank = watson.retrieve_and_rank(params);

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
var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,title'}); //bodyで中身表示

solrClient.get('fcselect', query, function(err, searchResponse) {
  if(err) {
    console.log('Error searching for documents: ' + err);
  }
    else {
      // console.log(JSON.stringify(searchResponse.response.docs, null, 2));
      // var response = { answer: searchResponse.response.docs[0].body,
      //       message: '回答が見つかりました。' };
        return res.status(200).send(JSON.stringify(searchResponse.response.docs));
    }
});
});

module.exports = router;




// //watson R&Rクラスター接続確認
// var retrieve_and_rank = watson.retrieve_and_rank({
//   username: '8e15a2cb-4a85-4ee4-8894-c1ee4436c686',
//   password: 'T3Btu4vegwaA',
//   version: 'v1'
// });

//// LIST クラスター　ランカー
// retrieve_and_rank.listClusters({},
//   function (err, response) {
//     if (err)
//       console.log('error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });

// retrieve_and_rank.listRankers({},
//   function(err, response) {
//     if (err)
//       console.log('error: ', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });
