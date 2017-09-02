var express = require('express');
var watson = require('watson-developer-cloud');
var info = require('../info/info.json');
var Cloudant =  require('cloudant');

var Cloudant =  Cloudant(info.cloudant.url);


/**
 * Cloudant モジュール
 * ラッパー
 */
 module.exports = function(dbname) {

    var db = Cloudant.db.use(dbname);
    var originals = {}
    
    originals.insert = db.insert;
    db.insert = insert;

    originals.find = db.find;
    db.find = find;

    originals.get = db.get;
    db.get = get;

    db.update = update;

    db.merge = merge;

    db.deleteBy = deleteBy;

    originals.destroy = db.destroy;
    db.destroy = destroy;
    db.originals = originals;

    return db;
 };

 /**
  * findメソッド　ラッパー
  * クエリー上限を超えた場合、1秒後にリトライ
  */
var find = function(parmes, callback) {
    var operation = retry.operation({
        retries: 5
    });

    operation.attempt (function (currentAttempt){
        this.originals.find(params, function (err, result){
            if (operation.retry(err)){
                if(!isTooManyRequests(operation.mainError())){
                    operation.stop();
                    callback(err ? operation.mainError() : null,result);
                    return;
                }
                return;
            }
            callback(err ? operation.mainError() : null, result);
        });
    }.bind(this));
}

/**
 * destroyメソッド　ラッパー
 */
var destroy = function (id, rev, callback ) {
    var operation = retry.operation({
        retries: 5
    });

    operation.attempt(function (currentAttempt){

        this.originals.destroy(id, rev, function(err, result){
            if (operation.retry(err)){
                return;
            }
            callback(err ? operation.mainError() : null, result);
        });
    }.bind(this));
}

/**
 * TooManyRequest
 */
var isTooManyRequests = function(err) {
    if (!err) return false;
    return err.error == "too_many_requests";
}