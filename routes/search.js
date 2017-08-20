// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var Cloudant =  require('cloudant');

// ルーターの作成
var router = express.Router();

// 検索画面の表示
router.get('/', function(req, res) {
    res.render('search/search', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
   });

// 検索画面の表示
router.get('/:q', function(req, res) {
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
  var question  = encodeURIComponent(req.params.q);
  var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'id,title,body,ranker.confidence'}); //bodyで中身表示
  
  solrClient.get('fcselect', query, function(err, searchResponse) {
    if(err) {
      console.log('Error searching for documents: ' + err);
    }
    else {
      var i = 0;
      searchResponse.response.docs.forEach(function() {
        searchResponse.response.docs[i].body = nl2br(searchResponse.response.docs[i].body);
        i++;
      })
      res.render('search/search', { params: searchResponse.response.docs, question: question});
    }
  });
});

// 詳細の表示
router.post('/datail', function(req, res) {
  var param = nl2br(req.body.text);
  var title = req.body.title;
  return res.render('search/datails', {params: param,title:title});
});

/**
* 改行をBRタグに変換
* 
* @param {String} str 変換したい文字列
*/
var nl2br = function (str) {
  return str.replace(/\n/g, '<br>');
 };

 // 詳細の表示
router.post('/insert', function(req, res) {
  //cloudant cledencial
  var me = '1ff0c135-d4bc-4875-b989-59d5878a6c1f-bluemix'; // Set this to your own account
  var password = '32b1e65ef3df93b92eb88a71bd1c45df32ff4fe51708aa7aadea3c3a7d9c5812';
  var cloudant = Cloudant({account:me, password:password});
  var db = cloudant.db.use('gt');

  //gtパラメータを設定
  var params = {

  };

  db.insert({ crazy: true }, 'id', function(err, body) {
    if (!err)
      console.log(body);
  });

  return
});


module.exports = router;