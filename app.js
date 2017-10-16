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

// jsons/のJSONファイルをクライアントサイドへ返します。
app.get('/jsons/:json', function(req, res, next) {
   res.json(require(`./jsons/${req.params.json}`));
 });

// ルーティングの設定
app.use('/', require('./routes/index'));
app.use('/search', require('./routes/search'));
app.use('/clus', require('./routes/clus'));
app.use('/gt', require('./routes/gt'));
app.use('/contents', require('./routes/contents'));
app.use('/test', require('./routes/test'));
app.use('/menu', require('./routes/menu'));
app.use('/sub', require('./routes/sub'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
 });

// リクエストの受け付け
var server = app.listen(process.env.PORT || 3000, function() {
 console.log('Listening on port http://localhost:' + '%d', server.address().port);
});