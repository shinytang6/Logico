var app = new Vue({
        el: '#Logico',
        data: {
            sentence: "",
            file: "",
            GeneratedSentence: "",
            GeneratedFile: ""
        },
        methods: {
            createEvent: function() {
                var that = this
                axios.get('/event/sentence', {
                    params: {
                      sentence: this.sentence
                    }
                  })
                  .then(function (response) {
                    console.log(response.data.GeneratedSentence)
                    that.GeneratedSentence = response.data.GeneratedSentence;
                    that.$nextTick(function(){
                         var dom = document.getElementById("p1")

                              var str = dom.innerHTML
                              var subStr1= new RegExp("[(]","g");//创建正则表达式对象
                              var subStr2= new RegExp("[)]","g");
                              var subStr3= new RegExp("[.,!]","g");
                              var newStr = str.replace(subStr1, "[").replace(subStr2, "]")
                              var newArr = eval(newStr);

                              var sentence = ""
                              for(var i=0;i<newArr.length;i++){
                                 if(newArr[i][0] == ","){
                                   tag = "comma"
                                 } else if (newArr[i][0] == ";") {
                                   tag = "semicolon"
                                 } else if (newArr[i][0] == ".") {
                                   tag = "full"
                                 } else if (newArr[i][0] == ":") {
                                   tag = "colon"
                                 } else if (newArr[i][0] == "!") {
                                   tag = "exclamation"
                                 } else if (newArr[i][0] == "'") {
                                   tag = "quotation"
                                 } else{
                                    tag = newArr[i][1].slice(0,2)
                                 }
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

                },
            createFile: function() {
                var that = this
                var formData = new FormData();
                formData.append('file', this.$refs["file"].files[0]);
                axios.post('/event/file', formData)
                  .then(function (response) {
                    that.GeneratedFile = response.data.GeneratedFile;
                    that.$nextTick(function(){
                         var dom = document.getElementById("p2")

                              var str = dom.innerHTML
                              var subStr1= new RegExp("[(]","g");//创建正则表达式对象
                              var subStr2= new RegExp("[)]","g");
                              var subStr3= new RegExp("[.,!]","g");
                              var newStr = str.replace(subStr1, "[").replace(subStr2, "]")
                              var newArr = eval(newStr);

                              var sentence = ""
                              for(var i=0;i<newArr.length;i++){
                                 if(newArr[i][0] == ","){
                                   tag = "comma"
                                 } else if (newArr[i][0] == ";") {
                                   tag = "semicolon"
                                 } else if (newArr[i][0] == ".") {
                                   tag = "full"
                                 } else if (newArr[i][0] == ":") {
                                   tag = "colon"
                                 } else if (newArr[i][0] == "!") {
                                   tag = "exclamation"
                                 } else if (newArr[i][0] == "'") {
                                   tag = "quotation"
                                 } else{
                                    tag = newArr[i][1].slice(0,2)
                                 }
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