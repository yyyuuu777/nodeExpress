function getPage(path,param){
    param&&Object.keys(param).map(item=>{
        if(path.indexOf('?')<0){
            path+=`?${item}=${param[item]}`
        }else{
            path+=`&${item}=${param[item]}`
        }
    })
    window.location.href=path;
}

function getParam(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    return r?unescape(r[2]):null;
    }
