// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var Cloudant = require('cloudant');
var info = require('../info/info.json');
var randr = require('../helper/r_and_r');
var _ = require('underscore');
var fs = require('fs');

var view_helpers = {
   app: require('../helper/app.js')
}

// ルーターの作成
var router = express.Router();

// ccontents画面の表示
router.get('/', function (req, res) {
   var params = Object.assign({
      params
   }, view_helpers
   );
   res.render('test/index', { params: params });
});

// List
router.post('/', function (req, res) {

   var selector = {}
   var query = {
      selector: selector
   };

   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('test');

   db.find(query, function (err, result) {
      if (err) throw err;
      res.render('test/list', { docs: result.docs, view_helpers });
   })

});

/**
 * コンテンツ新規登録ページ表示
 */
router.get('/new', function(req, res, next) {
   var doc = {};
   var params = Object.assign({
     mode: 'new',
     doc: doc,
   }, view_helpers);
   res.render('test/form', {params: params});
});

/**
 * コンテンツ編集ページ表示
 */
router.get('/:_id/edit', function (req, res, next) {
   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('test');

   var query = {
      selector: { "_id": req.params._id }
   };

   db.get(req.params._id, function (err, doc) {
      if (err) throw err;

      var params = Object.assign({
         mode: 'edit',
         doc: doc
      }, view_helpers);
      res.render('test/form', { params: params });
   });
});

// ファイル出力
router.post('/output', function (req, res) {
   var selector = {}
   var query = {
      selector: selector
   };
   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('test');

   db.find(query, function (err, result) {
      if (err) throw err;

      var docs = result.docs;
      docs.forEach(function (doc) {
         delete doc._id;
         delete doc._rev;   
     })
      
      if (req.body.type === 'json') { //jsonフォーマット
         var data = {docs};
         data = JSON.stringify(data, null, '    ');
         fs.writeFile('public/files/contents_test.json', data);
         return;
      }
   });
});

module.exports = router;