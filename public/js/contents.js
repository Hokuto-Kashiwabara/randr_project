'use strict';
/**
 * ready
 */
$(function () {

   var data;

   $.post('/contents', data)
      .done(function (res) {
         $('#result').html(res)

      }).fail(function (error) {
         console.log(error);
      });

	// /**
	//  * リストクリック 効かない
	//  */
   // $('#result tbody tr').click(function () {
   //    var id = document.getElementById("id").value;
   //    window.location.href = '/' + id;
   // })

   /**
   * リストクリック 効かない
   */
   // $('#result tbody tr').click(function () {
   //    var id = document.getElementById("id").value;
   //    $.get('/contents/' + _id + '/edit')
   //       .done(function (html) {
   //          showContent(html);
   //          app.addTooltip();
   //       })
   //       .fail(function (error) {
   //          app.showError();
   //          console.log(error);
   //       });
   // });

   $(document).on('click','#result tbody tr', function() {
      //クリックした後の処理
      var _id = $(this).closest('tr').find('input[name="_id"]').val();
      $.get('/contents/' + _id + '/edit')
         .done(function (html) {
            showContent(html);
         })
         .fail(function (error) {
            console.log(error);
         });
      });

});


// R_and_R for OUTputボタンクリック
// -------------------------------------------------------------------
var rr_out = function (e) {

   var data = { type: e.getAttribute("dataType") };

   $.post('/gt/output', data)
      .done(function (res) {
         console.log(res);

      }).fail(function (error) {
         console.log(error);
      });

}


   /**
    * コンテンツを表示します。
    * @param html {String} - ModalのHTML
    */
    var showContent = function(html) {
      $('#contents-modal').html(html);
      $('#contents-modal').modal('show');
    }

// /**
//  * リストクリック
//  */
// var f_click = function(e){
//   var id = e.cells[3].innerText;
//   window.location.href = window.location.href + '/' + id ;
// }

/**
 * 新規登録ボタン
 */
var entry = function (e) {
   window.location.href = window.location.href + '/' + 'entry';
}