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
   res.render('contents/index', { params: params });
});

// List
router.post('/', function (req, res) {

   var selector = {}
   var query = {
      selector: selector
   };

   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('contents');

   db.find(query, function (err, result) {
      if (err) throw err;
      res.render('contents/list', { docs: result.docs, view_helpers });
   })

});

// modal
router.get('/:id', function (req, res) {

   if (req.params.id != 'entry') {
      var selector = { "id": req.params.id }
      var query = {
         selector: selector
      };
      var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
      var db = cloudant.db.use('contents');

      db.find(query, function (err, result) {
         if (err) throw err;
         res.render('app/list_modal', { doc: result.docs[0], view_helpers });
      })
   } else {
      res.render('app/list_modal', { doc: 'entry', view_helpers });
   }
});


/**
 * コンテンツ編集ページ表示
 */
router.get('/:_id/edit', function (req, res, next) {
   var cloudant = Cloudant({ account: info.cloudant.username, password: info.cloudant.password });
   var db = cloudant.db.use('contents');

   var query = {
      selector: { "_id": req.params._id }
   };

   db.get(req.params._id, function (err, doc) {
      if (err) throw err;

      var params = Object.assign({
         mode: 'edit',
         doc: doc
      }, view_helpers);
      res.render('contents/dialog', { params: params });
   });
});

// (2)新規メモの作成(ダイアログ表示)
router.get('/memos', function (req, res) {
   res.render('dialog', { id: null, doc: null });
});

module.exports = router;