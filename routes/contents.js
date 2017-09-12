// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var Cloudant =  require('cloudant');
var info = require('../info/info.json');
var randr = require('../helper/r_and_r');
var _ = require('underscore');

var view_helpers = {
   app : require('../helper/app.js')
}

// ルーターの作成
var router = express.Router();

// ccontents画面の表示
router.get('/', function(req, res) {
   var params = Object.assign({
      params }, view_helpers
   );
    res.render('contents/index', {params:params });
});

// List
router.post('/', function(req, res){
   
       var selector = {}
       var query = { selector : selector
       };
   
       var cloudant = Cloudant({account:info.cloudant.username, password:info.cloudant.password});
       var db = cloudant.db.use('contents');
   
       db.find(query,function(err,result){
           if(err) throw err;
           var params = {params:result.docs };
           res.render('contents/list', { params: params, app: view_helpers } );
       })
   
   });

module.exports = router;