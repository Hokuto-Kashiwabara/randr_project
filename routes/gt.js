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

var view_helpers = {
    app : require('../helper/app.js')
}

// ルーターの作成
var router = express.Router();

// gt画面の表示
router.get('/', function(req, res, next) {
 res.render('gt/gt', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
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
        var params = {params:result.docs } 
        res.render('gt/list', {params:params, app:view_helpers} )
    })

});

// Json
router.post('/json', function(req, res) {

   var selector = {}
   var query = { selector : selector
   };
   var cloudant = Cloudant({account:info.cloudant.username, password:info.cloudant.password});
   var db = cloudant.db.use('gt');

   db.find(query,function(err,result){
       if(err) throw err;

       var data = {
         result
      };

      data = JSON.stringify(data, null, '    ')
      
      fs.writeFile('gt.json', data);
      return

   })
});


// cloudant.get(db,query,function(err, body) {
//   if (!err)
//     console.log(body);
// });


module.exports = router;
