'use strict';

module.exports = {

	/**
	 * 渡された配列のサイズを変更します。
	 * 指定サイズより大きい場合は以降の要素を切り捨てます。
	 * 指定サイズより小さい場合は指定サイズとなるまで空オブジェクトを追加します。
	 * @param target {Array} - サイズを変更したい配列
	 * @param size {Number} - 配列サイズ
	 * @return {Array} リサイズ後の新たな配列
	 */
	resize: function(target, size) {
		var ret = [];
		for (var i = 0; i < size; i++) {
			ret.push(i < target.length ? target[i] : {});
		}
		return ret;
	},

	/**
	 * 渡されたオブジェクトが配列であることを保証します。
	 * @param target {Object} - 配列であることを保証したいオブジェクト
	 * @return {Array} 要素0以上の配列
	 */
	ensure: function(target) {
		if (!target) return [];
		return target instanceof Array ? target : [target];
	},

	/**
	 * 渡された配列に指定の要素が存在します。
	 * @param target {Array} - 対象配列
	 * @param search {String} - 検索対象
	 * @return {Boolean} 存在する場合true
	 */
	contains: function(target, search) {
		if (target == null) return false;
		var ensured = this.ensure(target);
		for (var i = 0; i < ensured.length; i++) {
			if (ensured[i] == search) return true;
		}
		return false;
	}
};
