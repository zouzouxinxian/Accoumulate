// 判断简约卡片的数量来进行展示
var insertAfter = function(newElement, targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
};
 if (document.querySelectorAll(".simple-card").length !== 0) {
     var ele =  document.querySelectorAll(".simple-card");
     var showNum=0;
     var eleObj=[];
     var eleArr=[];
     for (var a=0;a<ele.length;a++) {
         if(ele[a].nextElementSibling) {
             if(ele[a].nextElementSibling.classList.contains('simple-card')){
                 eleArr.push(ele[a]);
             }else{
                 eleArr.push(ele[a]);
                 eleObj.push(eleArr);
                 eleArr=[];
             }
         } else {
             eleArr.push(ele[a]);
             eleObj.push(eleArr);
             eleArr=[];
         }
     }
     for (var b=0;b<eleObj.length;b++) {
         showNum = 0;
         if(eleObj[b].length % 4 !=0){
             for (var i= eleObj[b].length-1;i>-1;i--) {
                 eleObj[b][i].parentNode.removeChild(eleObj[b][i]);
                 if(i % 4 == 0){
                     showNum=i;
                     break
                 }
             }
         }else {
             showNum = eleObj[b].length;
         }
         for (var n=0;n<(showNum);n++) {
             if(n % 4 ==0){
                 eleObj[b][n].setAttribute('style', 'margin-left: 46px;float:left;display:block');
                 var div = document.createElement('div');
                 div.setAttribute('style', 'clear:both');
                 if(n !== 0){insertAfter(div, eleObj[b][n-1]);}
             }else{
                 eleObj[b][n].setAttribute('style', 'float:left;display:block');
             }
         }
         if (showNum) {
             var div = document.createElement('div');
             div.setAttribute('style', 'clear:both');
             insertAfter(div, eleObj[b][showNum-1]);
         }

     }
 }