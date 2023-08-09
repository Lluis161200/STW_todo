const options = {
    data: function(){
        return {
            a: false,
            b: false,
            c: false,
            d: false,

        }
        
    },
    watch:{
        a(){
            this.b=this.a

        },
        b(){
            this.c=this.a

        },
        c(){
            this.d=this.c

        },

    },

    template: `
    <input type="checkbox" v-model="a">
    {{a}} {{b}} {{c}} {{d}}`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

