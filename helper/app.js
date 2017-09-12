
module.exports = {

    /**
     * undifindなら空をかえす
     * @param {*} target 
    */
    nvl : function(target) {
        if(target == undefined ){
            target = "";
        }
        return target;
    },


   /**
   * 改行をBRタグに変換
   * 
   * @param {String} str 変換したい文字列
   */
   nl2br : function (str) {
      return str.replace(/\n/g, '<br>');
   }

};


