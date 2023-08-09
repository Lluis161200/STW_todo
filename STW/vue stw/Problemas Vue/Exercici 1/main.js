const options = {
    data: function(){
        
        return {
            counter: 0
        }
    },
    tempate: `<spam>{{counter}}</spam>`
}
const vm = Vue.createApp(options).mount('#app');
setInterval(() => vm.counter++, 100);
