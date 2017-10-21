// var str = "[('This', 'DT'), ('is', 'VBZ'), ('a', 'DT'), ('test', 'NN'), ('file', 'NN')]"
var dom = document.getElementById("p")

var str = dom.innerHTML
var subStr1= new RegExp("[(]","g");//创建正则表达式对象
var subStr2= new RegExp("[)]","g");
var newStr = str.replace(subStr1, "[").replace(subStr2, "]")
var newArr = eval(newStr);
// var countArr= [];
// console.log(newArr)

var sentence = ""
for(var i=0;i<newArr.length;i++){
   // var bool = false;
   // if(countArr){
   //    countArr.forEach(function(item){
   //       if(item.type == newArr[i][1]){
   //          item.count ++;
   //          bool = true
   //       } 
   //    })
   // }
   // if(!bool){
   //    countArr.push({
   //       type: newArr[i][1],
   //       count: 1
   //    })
   // }
   // console.log(newArr[i][0])
   // sentence = sentence + " " +newArr[i][0]
   var tag = newArr[i][1].slice(0,2)
   console.log(tag)
   if(tag == "DT"){
      tag = "DTA"
   }
   newSentence = "<"+tag +">"+ newArr[i][0] + "</"+tag+">"
   // console.log(newSentence)
   sentence = sentence + " " + newSentence
}
console.log(sentence)
dom.innerHTML = sentence