// MemoApp - app.js

// (a)�g�p���W���[���̓ǂݍ���
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');

// (b)�A�v���P�[�V�����̍쐬
var app = express();

// (c)�r���[�̐ݒ�
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// (d)�~�h���E�F�A�̐ݒ�
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'));

// (e)���[�e�B���O�̐ݒ�
app.use('/', routes);

// (f)���N�G�X�g�̎󂯕t��
var server = app.listen(process.env.PORT || 3000, function() {
 console.log('Listening on port %d', server.address().port);
});