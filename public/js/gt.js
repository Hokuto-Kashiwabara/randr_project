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
