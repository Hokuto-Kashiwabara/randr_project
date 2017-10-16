'use strict';
/**
 * ready
 */
$(function () {

   var data;

   $.post('/test', data)
      .done(function (res) {
         $('#result').html(res)
      }).fail(function (error) {
         console.log(error);
      });

   $(document).on('click', '#result tbody tr', function () {
      //クリックした後の処理
      var _id = $(this).closest('tr').find('input[name="_id"]').val();
      $.get('/test/' + _id + '/edit')
         .done(function (html) {
            showContent(html);
         })
         .fail(function (error) {
            console.log(error);
         });
   });

   /**
   * 新規登録ボタンクリック
   * 新規登録フォームを表示します。
   */
   $('#add').click(function(e) {
      e.preventDefault();
      $.get('/test/new')
         .done(function(html) {
            showContent(html);
         })
         .fail(function(error) {
            console.log(error);
         });
   });

   /**
   * 登録ボタンクリック
   * コンテンツをCloudantに登録します。
   */
   $('#create-contents').click(function() {
      $('#create-contents').prop('disabled', true);
      $('#cancel-contents').prop('disabled', true);
      document.body.style.cursor = 'wait';    
      persist(create, function(){
      $('#create-contents').prop('disabled', false);
      $('#cancel-contents').prop('disabled', false);
      document.body.style.cursor = 'auto';    
      });
   });
});

// R_and_R for OUTputボタンクリック
// -------------------------------------------------------------------
var rr_out = function (e) {

   var data = {type: e.getAttribute("dataType")};

   $.post('/test/output', data)
      .done(function (res) {
         console.log(res);
         alert('出力が完了しました。');
      }).fail(function (error) {
         console.log(error);
      });
}

/**
 * コンテンツを表示します。
 * @param html {String} - ModalのHTML
 */
var showContent = function (html) {
   $('#contents-modal').html(html);
   $('#contents-modal').modal('show');
}