const options = {
    data: function(){
        
        return {
            a: 0,
            b: 1,
        }
    },
    template: `<input type='number' v-model="a"> 
    <input type='number' v-model="b">
    <span> {{a+b}}</span>`
    
}
const app = Vue.createApp(options)
const vm= app.mount('#app');

