const options = {
    data: function(){
        return {
            buffer: '',
            bgColor: 'white',
        }
        
    },

    template: `<input v-bind:style="{'background-color': bgColor}" 
    @keydown="bgColor='red'"
    @keyup="bgColor='white'" 
    type="text" v-model="buffer">`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

