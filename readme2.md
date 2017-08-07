'use strict';

/**
 * ready
 */
$(function() {

	/**
	 * 質問ボタンクリック 入力された質問でクエリを発行します。
	 */
	$('#gt_q_send_teiki').click(function() {
		query($('#gt_qwords_teiki').val());
	});
});

/**
 * 渡された文字列でWatsonに実際に質問します。
 * http://js.studio-kingdom.com/jquery/ajax/post
 * @param {object}
 *            q - Watsonへの質問
 * @param {String}
 *            corpus - アクセスしたいコーパス名
 */
var doQuery = function(q, corpus) {
	var params = {
		q : q
	};
	$.post('/gt/' + corpus, params).done(function(html) {
		$('#' + corpus + '-panel').html(html);
		app.addTooltip(); 

	}).fail(function(error) {
		console.log(error);
	});
}







<%
var counter=1;

%>
<div class="panel panel-default" corpus="<%= params.corpus %>">

  <!-- パネルヘッダ -->
  <div class="panel-heading" corpus="<%= params.corpus %>">
    <span class="<%= params.corpora[params.corpus].glyphicon %>"></span>
    <%= params.corpora[params.corpus].panel_label %>
    <span class="relavance_label"><%= params.corpora[params.corpus].panel_label2 %></span>
  </div>
  <!-- パネルヘッダ -->

  <!-- リスト -->
  <% var i = 0; %>
  <% params.docs.forEach(function(doc) { %>

    <% if (i == 0 || i == params.constants.FIRST_DISPLAY_ROWS*2) { %>
      <%# jQueryはtableやtbodyではアニメーションが効かない仕様のため、divで囲い、残り5行表示のアニメーションを実現しています。 %>
      <div id="<%= params.corpus %>-table-container" corpus="<%= params.corpus %>"
          class="<%= i == 0 ? '' : 'more-rows'; %>"
          style="<%= i == 0 ? '' : 'display:none;'; %>">
        <table class="table <%= (i == 0 || i == 10) ? 'table-striped' : ''; %>">
    <% } %>

    <tr>
       <!-- Rank -->
        <td class="gt-rank">
          <%=i+1 %>
        </td>
      <!-- Rank -->

      <!-- 確信度 -->
        <td class="score text-right col-gt-1">
            <% if(doc.id){ %>
            <%#	 if (params.corpus == "faq"){ %>
            <%	 if (params.app.toScore(doc["ranker.confidence"])){ %>
            		<%= params.app.toScore(doc["ranker.confidence"]) %>
            	<% } %>
            <% } %>
        </td>
      <!-- 確信度 -->

      <!-- id -->
        <td class="gt-id">
          <%= doc.id %>
        </td>
      <!-- id -->
      <!-- タイトル -->
      <td class="title col-gt-7">
        <% if (doc.id) { %>
        <% var name_label="gt_"+params.corpus+"_"+counter %>

        <% if (params.corpus == 'faq') { %>
            <% var forGreen = String(doc.link_info).substring(0, 1).toUpperCase() == 'G'; %>
          <% } else if (params.corpus == 'station') { %>
            <% var kana = doc.answer[0].split(' ')[params.constants.KANA_INDEX];  %>
          <% } %>


          <% if (params.app.isFile(doc.link_info)) { %>
          <a 
              href="javascript:void(0);" 
              data-href="<%= params.app.linkInfoToUrl(params.corpus, doc); %>" class="js_download_link"
              data-toggle="tooltip" data-placement="bottom"
              data-original-title="<%=`id: ${doc.id}`; %>">

          <% } else { %>
          <a target="_blank"
              href="<%= params.app.linkInfoToUrl(params.corpus, doc); %>"
              data-toggle="tooltip" data-placement="bottom"
              data-original-title="<%=`id: ${doc.id}`; %>">
          <% } %>

            <% if (params.corpus == 'faq') { %>
              <%= forGreen ? '【定型文】' : '【FAQ】'; %>
            <% } %>

            <% if (params.corpus == 'suica') { %>
              <%= _.startsWith(doc.link_info, 'http') ? '【HP】' : '【パンフ】'; %>
            <% } %>

            <%= doc.title %>

            <% if (params.corpus == 'station') { %>
              <span class="kana">&nbsp;&nbsp;<%= kana %>
            <% } %>
          </a>
        <% } %>
      </td>
      <!-- タイトル -->

      <!-- FAQだけGTのドキュメントIDが、TID(link_info)となる。 それ以外は、DocID -->
      <% gt_doc_id = (params.corpus == 'faq')? doc.link_info:doc.id; %>

      <!-- 評価 -->
        <td class="score text-right col-gt-4">
            <% if (doc.id) { %>
            	<%# if (params.corpus == "faq"){ %>
            		<%= 4 %> <input type="radio" class="groundtruth" name="<%=name_label %>" value="<%=gt_doc_id%>,<%=4%>"/>
            		<%= 3 %> <input type="radio" class="groundtruth" name="<%=name_label %>" value="<%=gt_doc_id%>,<%=3%>"/>
            		<%= 2 %> <input type="radio" class="groundtruth" name="<%=name_label %>" value="<%=gt_doc_id%>,<%=2%>"/>
            		<%= 1 %> <input type="radio" class="groundtruth" name="<%=name_label %>" value="<%=gt_doc_id%>,<%=1%>"/>
            		<%= 0 %> <input type="radio" class="groundtruth" name="<%=name_label %>" value="<%=gt_doc_id%>,<%=0%>" checked="checked"/>
            		<% counter++ %>
            	<%# } %>
            <% } %>
        </td>
      <!-- 評価 -->

    </tr>

<% if (i == params.constants.FIRST_DISPLAY_ROWS*2 - 1 || i == params.constants.MAX_GT_DISPLAY_ROWS - 1) { %>

        </table>
        </div>
      <% } %>

     <% i++; %>
    <% }) %>
  </table>
  <!-- リスト -->

  <!-- もっとみるボタン -->
  <div class="more-button-container">
    <button corpus="<%= params.corpus %>" type="button" class="btn btn-default more" style="display: none;" aria-label="Left Align">
        <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
    </button>
  </div>
  <!-- もっとみるボタン -->
</div>