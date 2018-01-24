'use strict';
(()=>{

    var addButton    = document.querySelector('.btn-add');
    var deteleButton = document.querySelector('.btn-delete')
    var clickNbr     = document.querySelector('#click-nbr');
    var apiUrl       = 'http://localhost:8080/api/click';
    this.ready=(fn)=>{
        if(typeof fn !== 'function') {
            return
        }
        if(document.readyState ==='complete') {
             return fn();
        }
        document.addEventListener('DOMContentLoaded',fn,false)
    }
    
    this.ajaxRequest=(method,url,callback)=>{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=()=>{
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
        }
        xmlhttp.open(method,url,true);
        xmlhttp.send();
    }
    this.updateClickCount=(data)=>{
        var clickObject = JSON.parse(data);
        clickNbr.innerHTML = clickObject.clicks;
    }
    ready(ajaxRequest('GET',apiUrl,updateClickCount));
    addButton.addEventListener('click',()=>{
        ajaxRequest('POST',apiUrl,()=>{
        ajaxRequest('GET',apiUrl,updateClickCount);
        })
    },false);

    deteleButton.addEventListener('click',()=>{
       ajaxRequest('DELETE',apiUrl,()=>{
           ajaxRequest('GET',apiUrl,updateClickCount)
       })
    },false)
})();