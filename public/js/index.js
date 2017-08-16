'use strict';

/**
 * ready
 */
$(function() {
});

// 質問ボタンクリック
// -------------------------------------------------------------------
var askQuestion = function() {
  // setTimeout(document.getElementById("answertable").style.display="block",1500)
  // 質問文のセット
  var q = document.getElementById("q").value;
  // console.log("q = " + q );
  // invokeRR(q);
  window.location.href = '/search/' + q ;
  // var xhr = new XMLHttpRequest();
  // var question = (window.location.href + "/search").getElementById("question");
  // question.innerHTML = JSON.parse(xhr.responseText);
}


