const options = {
    data: function(){
        return {
            buffer: '',
        }
        
    },
    watch: {
        buffer(){
            if(this.buffer.length >= 5){
                this.buffer= ""

            }
        }

    },
    

    template: `<input type="text" v-model="buffer">`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

