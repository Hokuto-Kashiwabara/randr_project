
module.exports = {

    /**
     * undifindなら空をかえす
     * @param {*} target 
    */
    nvl : nvl = function(target) {
        if(target == undefined ){
            target = "";
        }
        return target;
    }


};


