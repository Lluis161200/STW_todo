const rootComponent={
    data() {
        return {
            state:'',
            
                     

        }
    },
    methods:{
        onMet(){
            this.state='just turned on'
        },

        offMet(){
            this.state='just turned off'

        }


    },
    
    template: `
    <div>
        <SwitchButton v-on:on="onMet" v-on:off="offMet"></SwitchButton> 
        {{state}}
    </div>
    `
    ,
    
}


const SwitchButton={
    emits:["on", "off"],
    props:["mostrar"],
    data(){
        return{
            mostra: false
        }
    },
    methods:{
        onMet(){
            this.mostra=true
            this.$emit('on')
        },

        offMet(){
            this.mostra=false
            this.$emit('off')

        }

    },
    
    template: `
    <div style="border:solid;display:inline-block">
        <button :disabled="mostra" @click="onMet">ON</button>
        <button :disabled="!mostra" @click="offMet">OFF</button>
    </div>
   
        
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('SwitchButton', SwitchButton)
const vm= app.mount('#app');

