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
 * HTMLを表示する。(新規ポップアップ)
 * @param {object}  details - data
 */
var senddatails = function(v) {
  var testdata = v.this.closest('tr')[0];
  var id = testdata.children[0].innerText;
  var title = testdata.children[1].innerText;
  var details = testdata.children[2].innerText; //body
  var q = v.doc.getElementById("question").value;

   $.post('/search/datail', {text:details, id:id, title,title, q:q
   }).done(function(html) {
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

  	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if(window.confirm('DB登録します。')){
      var doc = {
         q:document.getElementById("question").value,
         id:document.getElementById('id').value
      };

      $.post('/search/insert', {doc:doc
      }).done(function() {
         console.log('DB OK');
      }).fail(function(error) {
         console.log(error);
      });
      $(usefulbtn).attr("disabled","disabled");
   } else {
      window.alert('キャンセルされました'); // 警告ダイアログを表示
   }
         // 「キャンセル」時の処理終了
}