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

// -------------------------------------------------------------------
// RRによる応答
// -------------------------------------------------------------------
var invokeRR = function(question, q) {
  console.log("これからRRを呼ぶよ");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    switch(xhr.readyState){
      case 4:
        if(xhr.status == 0){
          console.log("XHR 通信失敗");
        }else{
          if(xhr.status == 200){
            console.log("受信:" + xhr.responseText);
            var answerArea = document.getElementById("answerArea");
            answerArea.innerHTML = JSON.parse(xhr.responseText).answer;
            // invokeT2S(JSON.parse(xhr.responseText).answer);
          }else{
            console.log("その他の応答:" + xhr.status);
            console.log("その他の応答:" + xhr.responseText);
            var answerArea = document.getElementById("answerArea");
            answerArea.innerHTML = JSON.parse(xhr.responseText).message;
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

// -------------------------------------------------------------------
// NLCに入れる前準備
// -------------------------------------------------------------------
var askQuestion = function() {
  // 回答欄のクリア
  var answerArea = document.getElementById("answerArea");
  answerArea.innerHTML = "Watsonの回答";

  // 質問文のセット
  var q = document.getElementById("q").value;
  console.log("q = " + q );
  invokeRR(q);
}

// -------------------------------------------------------------------
// XMLHttpRequest オブジェクトを作成する関数
// -------------------------------------------------------------------
function XMLHttpRequestCreate(){
  try{
    return new XMLHttpRequest();
  }catch(e){}
  // IE6
  try{
    return new ActiveXObject('MSXML2.XMLHTTP.6.0');
  }catch(e){}
  try{
    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
  }catch(e){}
  try{
    return new ActiveXObject('MSXML2.XMLHTTP');
  }catch(e){}
  // not supported
  return null;
};