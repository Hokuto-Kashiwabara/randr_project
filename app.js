// answers - app.js

// 使用モジュールの読み込み
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');

// アプリケーションの作成
var app = express();

// ビューの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ミドルウェアの設定
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'));

// ルーティングの設定
app.use('/', routes);

// リクエストの受け付け
var server = app.listen(process.env.PORT || 3000, function() {
 console.log('Listening on port http://localhost:' + '%d', server.address().port);
});