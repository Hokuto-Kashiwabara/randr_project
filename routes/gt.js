// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var cloudant = require('../helper/cloudant.js');
var info = require('../info/info.json');
var Cloudant =  require('cloudant');
var app = require('../helper/app.js');
var fs = require('fs');
var _ = require('underscore');

var view_helpers = {
    app : require('../helper/app.js')
}

// ルーターの作成
var router = express.Router();

// gt画面の表示
router.get('/', function(req, res, next) {
 res.render('gt/index', {});
});

// List
router.post('/', function(req, res){

    var selector = {}
    var query = { selector : selector
    };

    var cloudant = Cloudant({account:info.cloudant.username, password:info.cloudant.password});
    var db = cloudant.db.use('gt');

    db.find(query,function(err,result){
        if(err) throw err;
        res.render('gt/list', { docs: result.docs, view_helpers } );
    })

});

// ファイル出力
router.post('/output', function(req, res) {
   var selector = {}
   var query = { 
      selector : selector
      };
   var cloudant = Cloudant({account:info.cloudant.username, password:info.cloudant.password});
   var db = cloudant.db.use('gt');

   db.find(query,function(err,result){
      if(err) throw err;

      var doc = result.docs;
      if(req.body.type == 'json'){ //jsonフォーマット
         var data = {
            doc
         };
         data = JSON.stringify(data, null, '    ');
         fs.writeFile('public/files/gt.json', data);
         return ;
      } else {

        var v = [];
        for (var i=0; i<=doc.length -1; i++){
            v = v + '"' + doc[i].params.q + '","' + doc[i].params.id + '","' + doc[i].params.rank + '" \r\n' ;
        }

        fs.writeFile('public/files/csv.csv', v);
        return ;
      }
   });

});

// cloudant.get(db,query,function(err, body) {
//   if (!err)
//     console.log(body);
// });


module.exports = router;
