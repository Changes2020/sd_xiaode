function reloadImage(url,callback){
    var img=new Image();
    callback&&img.addEventListener("load", callback, false);
    img.src=url;
}
var reloadImages=['http://bi-m.ministudy.com/staticFile/load.gif'];
for(var i=0;i<reloadImages.length;i++){
    var callback=i===reloadImages.length-1?imageLoaded:null;
    reloadImage(reloadImages[i],callback);
}
function imageLoaded(){
}
