const options = {
    data: function(){
        return {
            redness:0,
        }
        
    },

    template: `
    <div>
        <div :style="'color: hsl(0,'+redness+'%,50%)'">AM I RED?</div>
        <input type="range" min="0" max="100" v-model="redness">
        <div v-if="redness>=70">YES!</div>
    </div>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

