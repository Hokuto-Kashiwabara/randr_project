'use strict';
/**
 * ready
 */
$(function() {

  var data;

  $.post('/contents', data)
    .done(function(res) {
      $('#result').html(res)
      
	  }).fail(function(error) {
		  console.log(error);
    });

	/**
	 * リストクリック 効かない
	 */
	$('#result tbody tr').click(function() {
    var id = document.getElementById("id").value;
    window.location.href = '/' + id ;
    })

});


// R_and_R for OUTputボタンクリック
// -------------------------------------------------------------------
var rr_out = function(e) {

   var data = { type : e.getAttribute("dataType") }; 

  $.post('/gt/output', data)
  .done(function(res) {
   console.log(res);

  }).fail(function(error) {
    console.log(error);
  });

}

/**
 * 新規登録ボタン・リストクリック
 */
var f_click = function(e){
  var id = e.cells[3].innerText;
  window.location.href = window.location.href + '/' + id ;
}