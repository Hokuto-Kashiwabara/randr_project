'use strict';
/**
 * ready
 */
$(function () {

   var keyDownCode = 0;

	/**
	 * 質問テキストボックスKeydown (押されたキーのコードをとっておく(日本語変換確定の場合keyupと異なるコード)
	 */
   $('#qwords').keydown(function (e) {
      if (13 == e.which) {
         e.preventDefault();
      }
      keyDownCode = e.which;
   });
	/**
	 * 質問テキストボックスKeyup (IME変換確定済で、テキストボックスにカーソルがある状態でEnterキーを押した場合のみ検索)
	 */
   $('#qwords').keyup(function (e) {
      if (13 != e.which || e.which != keyDownCode) {
         return false;
      }
      doQuery($('#search-form').serialize());
   });
	/**
	 * 質問ボタンクリック 入力された質問でクエリを発行します。
	 */
   $('#q_send').click(function (e) {
      e.preventDefault();
      doQuery($('#search-form').serialize());
   });
	/**
	 * セレクトボックス変換時 入力された質問でクエリを発行します。
	 */
   $('#condition-corpus').change(function (e) {
      if ($('#qwords').val() === "") {
         return;
      }
      doQuery($('#search-form').serialize());
   });

	/**
	 * ページロード
	 */
   var init = function () {
      $('#qwords').focus();
   }

   init();
});

/**
 * 渡された文字列でWatsonに実際に質問します。
 */
var doQuery = function (data) {

   $.post('/sub/query', data)
      .done(function (html) {
         $('#result-panel').html(html);
      })
      .fail(function (error) {
         console.log(error);
      });
}

