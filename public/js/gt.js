'use strict';
/**
 * ready
 */
$(function () {

   var data;

   $.post('/gt', data)
      .done(function (res) {
         $('#result').html(res)

      }).fail(function (error) {
         console.log(error);
      });
});


// R_and_R for OUTputボタンクリック
// -------------------------------------------------------------------
var rr_out = function (e) {

   var data = {type: e.getAttribute("dataType")};
   $.post('/gt/output', data)
   .done(function (res) {
      alert("データ保存");
      console.log(res);
   }).fail(function (error) {
      console.log(error);
   });
   // $.ajax({
   //    url: '/gt/output',
   //    type: 'POST',
   //    success: function(result) {
   //       alert("データ保存");
   //       console.log(res);
   //    },
   //    error: function(result) {
   //       console.log(error);
   //      alert("更新に失敗しました。");
   //    }
   //  });
   
}