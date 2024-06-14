/* 作者:Disy & StarLight，拷贝及使用前请务必征得作者同意！ */

String.prototype.format = function(){
    if(arguments.length === 0){
        return this;
    }

    let s = this;
    for(let i = 0; i < arguments.length; i++){
        s = s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    }

    return s;
};


function deepCopy(origin){
    let obj = {};
    if(origin instanceof Array){
        obj = [];
    }
    for(let key in origin){
        let value = origin[key];
        obj[key] = (typeof value === "object" && value !== null) ? deepCopy(value) : value;
    }
    return obj;
}

/* 深拷贝函数 */
function cloneFunction(fn) {
    //参数验证
    if (!(fn && fn instanceof Function)) {
        return new Function();
    }
    // 将函数转成字符串
    let str = fn.toString();
    //截取函数体内容字符串
    let subStr = str.substring(str.indexOf("{") + 1, str.lastIndexOf("}"));
    // 利用截取函数体内容的字符串和函数的构造器生成新的函数并返回
    return new Function(subStr);
}

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random() * minNum + 1,10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum,10);
        default:
            return 0;
    }
}