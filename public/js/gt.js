'use strict';
/**
 * ready
 */
$(function() {

  var data;

  $.post('/gt', data)
    .done(function(res) {
      $('#result').html(res)
      
	  }).fail(function(error) {
		  console.log(error);
    });

});


// R_and_R for JSONボタンクリック
// -------------------------------------------------------------------
var rrJson = function() {

   var data; 

  $.post('/gt/json', data)
  .done(function(res) {
   console.log(res);

  }).fail(function(error) {
    console.log(error);
  });

}