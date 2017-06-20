function $(tag){
        var name = tag.substring(1);
    if(tag.indexOf('#')>-1){
                return document.getElementById(name)

    }else if(tag.indexOf('.')>-1){
                return document.getElementsByClass(name);

    }else{
                return document.getElementsByName(tag);

    }

};

$.prototype.val = function(ele){
        return ele.value();

}
function GetXmlHttpObject(){
        var xmlHttp=null;
    try{
               xmlHttp=new XMLHttpRequest();

    }
    catch (e){
        try{
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e){
             xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
        return xmlHttp;

}

function ajax_post(path,postData,callBack){

    var postData = postData || {
                "name1": "value1",
                "name2": "value2"

    };

        postData = (function(obj){
                var str = "";
            for(var prop in obj){
                            str += prop + "=" + obj[prop] + "&"

            }
                return str;
            })(postData);

        var xhr =GetXmlHttpObject();
        xhr.open("POST", path, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                    callBack(JSON.parse(xhr.responseText))

            }

        }

    };
        xhr.send(postData);
}

