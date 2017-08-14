'use strict';

/**
 * ready
 */
$(function() {

	/**
	 * クラスター確認ボタンクリック
	 */
	$('#clsButton').click(function() {
    var username = encodeURIComponent($('#input_username')[0].value).trim();
    var password = encodeURIComponent($('#input_password')[0].value).trim();
    var params = {
      u:username,
      p:password
    }
		  cluscheck(params);
  });

	/**
	 * リストクリック
	 */
	$('#tableid tbody tr').click(function() {
  document.getElementById("footpanel").style.display="block";

  var v = $(this).closest('tr')[0];
  var table = document.getElementById("tablefoot");
  var cell = table.rows[1];
  cell.innerHTML = v.children[3].innerText;
  })
});

/**
 * 渡された文字列でクラスターを確認する。
 * @param {object}  params - auth
 */
var cluscheck = function(params) {
	$.post('/list', params).done(function(html) {
    $('panel-heading').html(html);
    console.log(html);

	}).fail(function(error) {
		console.log(error);
	});
}

// 質問ボタンクリック
// -------------------------------------------------------------------
var askQuestion = function() {
  // setTimeout(document.getElementById("answertable").style.display="block",1500)
  // 質問文のセット
  var q = document.getElementById("q").value;
  // console.log("q = " + q );
  // invokeRR(q);
  window.location.href = '/search';

  var xhr = new XMLHttpRequest();
  var question = (window.location.href + "/search").getElementById("question");
  question.innerHTML = JSON.parse(xhr.responseText);
}

// -------------------------------------------------------------------
// RRによる応答
// -------------------------------------------------------------------
var invokeRR = function(question, q) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    switch(xhr.readyState){
      case 4:
        if(xhr.status == 0){
          console.log("XHR 通信失敗");
        }else{
          if(xhr.status == 200){
            var i = 0;
            var g = 0;
            $('#tableid tbody td').each(function(){
                if(i == "0" || i == "3" || i == "6" || i == "9" || i == "12"){
                    var v = JSON.parse(xhr.responseText)[g]
                    a = 100 * v["ranker.confidence"];
                    $(this).text(a.toFixed(2) + "%");
                    i++;
                } else if (i == "1" || i == "4" || i == "7" || i == "10" || i == "13"){
                    var a = JSON.parse(xhr.responseText)[g].title;
                    $(this).text(a);
                    i++;
                } else if (i == "2" || i == "5" || i == "8" || i == "11" || i == "14"){
                    var a = JSON.parse(xhr.responseText)[g].body;
                    $(this).text(a);
                    i++;
                    g++;
                }
            });
          }else{
            console.log("その他の応答:" + xhr.status);
            // var answerArea = document.getElementById("answerArea");
            // answerArea.innerHTML = JSON.parse(xhr.responseText).message;
            // invokeT2S(JSON.parse(xhr.responseText).message);
          }
        }
      break;
    }
  };
  var url = "./answer/" + question ;
  xhr.open("GET", url, true);
  xhr.send("");
}


// // -------------------------------------------------------------------
// // NLCによるクラス分け
// // -------------------------------------------------------------------
// var invokeNLC = function(q) {        
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function (){
//     switch(xhr.readyState){
//       case 4:
//         if(xhr.status == 0){
//           console.log("XHR 通信失敗");
//         }else{
//           if(xhr.status == 200){
//             console.log("受信:" + xhr.responseText);
//             invokeRR(JSON.parse(xhr.responseText).cl, q);
//           }else{
//             console.log("その他の応答:" + xhr.status);
//             console.log("その他の応答:" + xhr.responseText);
//             var answerArea = document.getElementById("answerArea");
//             answerArea.innerHTML = JSON.parse(xhr.responseText).message;
//             invokeT2S(JSON.parse(xhr.responseText).message);
//           }
//         }
//       break;
//     }
//   };
//   var url = "./natural_language_classifier?q=" + q;
//   xhr.open("GET", url, true);
//   xhr.send("");
// }


// // -------------------------------------------------------------------
// // T2Sによりしゃべる
// // -------------------------------------------------------------------
// var invokeT2S = function(text){
//   var audio = document.createElement("audio");
//   console.log("text = " + text);
//   audio.src = "./text_to_speech?text=" + text;
//   audio.play();      
// }

// // -------------------------------------------------------------------
// // 質問の長さを確認してボタンを有効／無効化
// // -------------------------------------------------------------------
// var checkLength = function($this) {
//   var askButton = document.getElementById("askButton");
//   if ($this.value.length > 0) {
//     askButton.disabled = false;
//   } else {
//     askButton.disabled = true;
//   }
// }
