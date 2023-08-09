const rootComponent={
    data(){
        return{
            buffer: '',
        }
    },
    
    template: `
    <div>
        <MagicInput v-model="buffer"></MagicInput>
        <input type="text" v-model="buffer">
        {{buffer}}
    </div>
    
    `
    
}


const MagicInput={
    props:["modelValue"],
    emits:["update:modelValue"],
    

    methods:{
        toggleCase(text){
            return text.replace(/./g, x => x.toUpperCase() == x ? x.toLowerCase() : x.toUpperCase())
        }

    },
    template: `
    <input :value="toggleCase(modelValue)"  @input="$emit('update:modelValue', toggleCase($event.target.value))"/>
   
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('MagicInput', MagicInput)
const vm= app.mount('#app');

