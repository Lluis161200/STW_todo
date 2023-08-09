const options = {
    data: function(){
        
        return {
            clicked: false,
        }
    },
    template: `<button v-bind:disabled="clicked" @click="clicked = true"> Click me</button>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

