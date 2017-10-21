var app = new Vue({
        el: '#Logico',
        data: {
            sentence: ""
        },
        methods: {
            createEvent: function() {
                axios.get('/event/create', {
                    params: {
                      sentence: this.sentence
                    }
                  })
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }
        }
})