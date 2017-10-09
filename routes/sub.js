var express = require('express');
var router = express.Router();
var array = require('../helper/array');
var Cloudant = require('cloudant');
var info = require('../info/info.json');

/**
 * Cloudant全文検索画面の表示
 */
router.get('/', function (req, res, next) {
   res.render('sub/index', {});
});

/**
 * 質問文をCloudantで検索します。 
 */
router.post('/query', function (req, res, next) {

   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('contents');
   var corpus = req.body.corpus;

   if (!req.body.qwords) {
      return;
   }

   var query = buildQuery(req.body.qwords, corpus);

   db.search('sub', 'subSearch', query, function (err, docs) {
      if (err) throw err;

      renderDocs(docs.rows, res);
   });
});

/**
 * 検索結果をレンダします。
 *
 * @param docs {Array} - ドキュメントリスト
 * @param res {HttpResponse} - レスポンス
 */
var renderDocs = function (docs, res) {

   docs = array.ensure(docs); //フィールドを一段上の階層に上げる。

   for (var i = 0; i < docs.length; i++) {
      Object.assign(docs[i], docs[i].fields)
   }

   var params = Object.assign({
      docs: docs
   });

   res.render('sub/list', { params: params });
}


/**
* 改行をBRタグに変換
* 
* @param {String} str 変換したい文字列
*/
var nl2br = function (str) {
   return str.replace(/\n/g, '<br>');
  };

/**
 * Cloudant Queryを作成します。
 */
var buildQuery = function (qword, corpus) {

   var query = {
      q: ' (body:' + qword + ' OR title:' + qword + ' OR id:' + qword + ')'
   };

   if (corpus !== 'all') {
      query.q += ' AND corpus: "' + corpus + '"';
   }

   return query;
}

module.exports = router;  
