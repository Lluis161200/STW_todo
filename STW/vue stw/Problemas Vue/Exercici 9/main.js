const options = {
    data: function(){
        return {
            a: false,

        }
        
    },
    computed:{
        b(){
            return this.a

        },
        c(){
            return this.b

        },
        d(){
            return this.c

        },

    },

    template: `
    <input type="checkbox" v-model="a">
    {{a}} {{b}} {{c}} {{d}}`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

