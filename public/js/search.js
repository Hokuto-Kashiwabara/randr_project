'use strict';

/**
 * ready
 */
$(function() {
	/**
	 * リストクリック
	 */
	$('#tableid tbody tr').click(function() {
  // document.getElementById("footpanel").style.display="block";

  var v = $(this).closest('tr')[0];
  // var table = document.getElementById("tablefoot");
  // var cell = table.rows[1];
  // cell.innerHTML = v.children[3].innerText;

  var details = v.children[3].innerText;
  // window.open('/search/q/', '_blank'); 

  senddatails(details);
  // window.location.href = '/search/q/' + ecodeURI(details) ;

  })
});

/**
 * 渡された文字列でクラスターを確認する。
 * @param {object}  details - auth
 */
var senddatails = function(details) {
	$.post('/search/datail', details).done(function(html) {
    console.log(html);
    newwindow(html);
	}).fail(function(error) {
		console.log(error);
	});
}

function newwindow(html) {
  var nwin = window.open("", '_blank');
	nwin.document.open();
	nwin.document.write(html);
  nwin.document.close();
}
