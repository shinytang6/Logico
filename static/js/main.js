var app = new Vue({
        el: '#Logico',
        data: {
            sentence: "",
            GeneratedSentence: ""
        },
        methods: {
            createEvent: function() {
                var that = this
                axios.get('/event/create', {
                    params: {
                      sentence: this.sentence
                    }
                  })
                  .then(function (response) {
                    console.log(response.data.GeneratedSentence)
                    that.GeneratedSentence = response.data.GeneratedSentence;
                    that.$nextTick(function(){
                         var dom = document.getElementById("p")

                              var str = dom.innerHTML
                              var subStr1= new RegExp("[(]","g");//创建正则表达式对象
                              var subStr2= new RegExp("[)]","g");
                              var newStr = str.replace(subStr1, "[").replace(subStr2, "]")
                              var newArr = eval(newStr);

                              var sentence = ""
                              for(var i=0;i<newArr.length;i++){
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
                    })
                             
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                }
        }
})