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
  var v = {
    this:$(this),
    doc:document
  }
  // var table = document.getElementById("tablefoot");
  // var cell = table.rows[1];
  // cell.innerHTML = v.children[3].innerText;
  // window.open('/search/q/', '_blank'); 
  senddatails(v);
  // window.location.href = '/search/q/' + ecodeURI(details) ;
  })
});

/**
 * 新規ポップアップでHTMLを表示する。
 * @param {object}  details - data
 */
var senddatails = function(v) {
  var testdata = v.this.closest('tr')[0];
  var details = testdata.children[1].innerText;
  var title = testdata.children[0].innerText;
  var q = v.doc.getElementById("question").value;

	$.post('/search/datail', {text:details,title:title,q:q}).done(function(html) {
    console.log(html);
    newwindow(html);
	}).fail(function(error) {
		console.log(error);
	});
}

/**
* 受け取ったhtmlを新規ポップアップで表示
* 
* @param {object} html 新規で表示したいポップアップ
*/
function newwindow(html) {
  var nwin = window.open("", '_blank');
	nwin.document.open();
	nwin.document.write(html);
  nwin.document.close();
}


// 役に立ったボタンクリック
var UsefulBtn = function(e) {
  console.log('DB登録');
  var doc = {
    q:document.getElementById("question").value,
    id:document.getElementById('tablefoot').rows[0].innerText
  };

  $.post('/search/insert', {doc:doc}).done(function() {
    console.log('DB OK');
	}).fail(function(error) {
		console.log(error);
  });
  
  $(usefulbtn).attr("disabled","disabled");
  alert('DB登録')
}