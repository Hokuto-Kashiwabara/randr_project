/**
 * 渡された文字列でWatsonに実際に質問します。
 *
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