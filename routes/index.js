// MemoApp - routes\index.js

// (a)�g�p���W���[���̓ǂݍ���
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');

// (b)���[�^�[�̍쐬
var router = express.Router();

// (1)�����ꗗ�̕\��(�y�[�W�\��)
router.get('/', function(req, res) {
 memo.list(function(err, list) {
 res.render('index', { version : package.version, list : list });
 });
});

// (2)�V�K�����̍쐬(�_�C�A���O�\��)
router.get('/memos', function(req, res) {
 res.render('dialog', { id : null, doc : null });
});

// (3)���������̕ҏW(�_�C�A���O�\��)
router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
 var id = req.param('id');

memo.get(id, function(err, doc) {
 res.render('dialog', { id : id, doc : doc });
 });
});

// (4)�V�K�����̕ۑ�
router.post('/memos', function(req, res) {
 var id = uuid.v4();
 var doc = {
 title : req.body.title,
 content : req.body.content,
 updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
 };

memo.save(id, doc, function(err) {
 res.redirect('/');
 });
});

// (5)���������̕ۑ�
router.put('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
 var id = req.param('id');
 var doc = {
 title : req.body.title,
 content : req.body.content,
 updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
 };

memo.save(id, doc, function(err) {
 res.redirect('/');
 });
});

// (6)���������̍폜
router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
 var id = req.param('id');

memo.remove(id, function(err) {
 res.redirect('/');
 });
});

module.exports = router;