var ArrayUtils={
    empty: function (array){
        if(array.length>=1){
            return false;
        }else{
            return true;
        }
    },
    max: function (array){
        var res=0;
        for(var i=0;i<array.length;i++){
             if(res<array[i]){
                res = array[i];
             }
        }
        return res;
    },
    min: function (array){
        var res=array[0];
        for(var i=0;i<array.length;i++){
            if(res>array[i]){
               res = array[i];
            }
        }
        return res;
    },
    average: function (array){
        var res=0;
        for(var i = 0; i < array.length; i++){
            res += array[i];
        }
        var total = res/array.length;
        return total;
    },
    indexOf:function (array,value){
        res=0;
        for(var i=0;i<array.length;i++){
            if(array[i]==value){
                res=i;
            }
        }
        return res;
    },
    
    subarray:function (array,startIndex,endIndex){
        var res=[];
        for(var i=startIndex;i<=endIndex;i++){
            res.push(array[i]);
        }
        return res;
    },
    
    samelength:function (a1,a2){
        if(a1.length == a2.length){
            return true;
        }else{
            return false;
        }
    },
    
    reverse:function (array){
        var revarray = array.reverse();
        return revarray;
    },
    
    swap:function (array,index1,index2){
        var res=[];
        for(var i=0;i<array.length;i++){
            if(array[i]==index1){
                res.push(index2);
            }else{
                res.push(array[i]);
            }
        }
        return res;
    },
    
    contains:function (array,value){
        var res=0;
        for(var i=0;i<array.length;i++){
            if(array[i]==value){
                res +=1;
            }
        }
        if(res >= 1){
            return true;
        }else{
            return false;
        }
    },
    
    concatenate:function (a1,a2){
        var res=[];
        for(var i=0;i<a1.length;i++){
            res.push(a1[i]);
        }
        for(i=0;i<a2.length;i++){
            res.push(a2[i]);
        }
        return res;
    }
}

module.exports = ArrayUtils;
