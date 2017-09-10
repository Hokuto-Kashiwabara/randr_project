var express = require('express');
var watson = require('watson-developer-cloud');
var info = require('../info/info.json');
var qs = require('qs');
var uuid = require('node-uuid');

module.exports = {
    
   /**
    * 投げられた質問をR&Rでfcselectをする。
    * @param {string} question 
   */
   select : function(question,callback) {
      var retrieve_and_rank = watson.retrieve_and_rank(info.r_and_r.conf);
      var solrClient = retrieve_and_rank.createSolrClient(info.r_and_r.cluster);
      var query     = qs.stringify({q: question, ranker_id: info.r_and_r.ranker_id, fl: 'id,title,body,ranker.confidence'}); //bodyで中身表示
      
      solrClient.get('fcselect', query, function(err, result) {
         if(err) throw err

         var i = 0;
         result.response.docs.forEach(function() {
            result.response.docs[i].body = nl2br(result.response.docs[i].body);
            i++;
         })
         var aaa = result.response.docs;
      return aaa;
      });
   }

};



/**
* 改行をBRタグに変換
* 
* @param {String} str 変換したい文字列
*/
var nl2br = function (str) {
   return str.replace(/\n/g, '<br>');
  };

// var function relax(opts, callback) {
//    if (typeof opts === 'function') {
//      callback = opts;
//      opts = {path: ''};
// }