'use strict';

/**
 * ready
 */
$(function() {

	/**
	 * クラスター確認ボタンクリック
	 */
	$('#clsButton').click(function() {
    var username = encodeURIComponent($('#input_username')[0].value).trim();
    var password = encodeURIComponent($('#input_password')[0].value).trim();
    var params = {
      u:username,
      p:password
    }
        cluscheck(params);
  });
});


/**
 * 渡された文字列でクラスターを確認する。
 * @param {object}  params - auth
 */
var cluscheck = function(params) {
	$.post('/list', params).done(function(html) {
    $('panel-heading').html(html);
    console.log(html);

	}).fail(function(error) {
		console.log(error);
	});
}