// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var Cloudant =  require('cloudant');
var info = require('../info/info.json');

// ルーターの作成
var router = express.Router();

// 検索画面の表示
router.get('/', function(req, res) {
    res.render('search/search', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
   });

// 検索画面の表示
router.get('/:q', function(req, res) {
      
  var retrieve_and_rank = watson.retrieve_and_rank(info.r_and_r.conf);
  var solrClient = retrieve_and_rank.createSolrClient(info.r_and_r.cluster);
  
  // var ranker_id = '7ff711x34-rank-525';
  var question  = encodeURIComponent(req.params.q);
  var query     = qs.stringify({q: question, ranker_id: info.r_and_r.ranker_id, fl: 'id,title,body,ranker.confidence'}); //bodyで中身表示
  
  solrClient.get('fcselect', query, function(err, result) {
    if(err) {
      console.log('Error searching for documents: ' + err);
    }
    else {
      var i = 0;
      result.response.docs.forEach(function() {
        result.response.docs[i].body = nl2br(result.response.docs[i].body);
        i++;
      })
      res.render('search/search', { params: result.response.docs, question: question});
    }
  });
});

// 詳細の表示
router.post('/datail', function(req, res) {
  var param = nl2br(req.body.text);
  var title = req.body.title;
  var q = req.body.q;
  return res.render('search/datails', {params:param, title:title, q:q} );
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
  var cloudant = Cloudant({account:info.cloudant.username, password:info.cloudant.password});
  var db = cloudant.db.use('gt');

  //gtパラメータを設定
  var params = {
      q:req.body.doc.q,
      id:req.body.doc.id,    
      rank:'4'
  };

  db.insert({params}, function(err, body) {
    if (!err)
      console.log(body);
  });

  return
});


module.exports = router;