// answers - routes\gt.js

// 使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var package = require('../package.json');
var watson = require('watson-developer-cloud');
var qs = require('qs');
var cloudant = require('../helper/cloudant.js');

// ルーターの作成
var router = express.Router();

// クラスター確認画面の表示(ページ表示)
router.get('/', function(req, res, next) {
 res.render('gt/gt', { title : 'sample Ansewrs', massage:'Welcom AnswersSite'});
});


router.post('/', function(req, res){

    var db = 'gt';
    var query = {
    };

    db.find(query,function(err,result){
        var params = {params:result} 
        res.render('gt/list', {params})
    })
});
// cloudant.get(db,query,function(err, body) {
//   if (!err)
//     console.log(body);
// });





module.exports = router;
