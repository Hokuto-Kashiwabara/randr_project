// answers - app.js

// 使用モジュールの読み込み
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// アプリケーションの作成
var app = express();
app.use(express.static(__dirname + '/public'));

// ビューの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ミドルウェアの設定
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'));

// ルーティングの設定
app.use('/', require('./routes/index'));
app.use('/search', require('./routes/search'));
app.use('/clus', require('./routes/clus'));
app.use('/gt', require('./routes/gt'));


// リクエストの受け付け
var server = app.listen(process.env.PORT || 3000, function() {
 console.log('Listening on port http://localhost:' + '%d', server.address().port);
});