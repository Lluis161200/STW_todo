const rootComponent={
    data: () => ({ color: null }),
    
    
    template: `
    <div style="border:solid red; display:flex;">
        <ColorSelector v-on:color="color = $event"></ColorSelector>
        <div v-bind:style="'color:' + color">TEXT</div>
    </div>
`
    
}


const ColorSelector={
    emits:["color"],
    data(){
        return{
            red: 0,
            green: 0,
            blue: 0,
        }
    },
    //el computed se hace otra vez cada vez que cambia red green o blue.
    computed:{
        RGB(){
            let rgbFunc=`rgb(${this.red}, ${this.green}, ${this.blue})`
            this.$emit("color", rgbFunc)
            return rgbFunc
        }

    },
   
    
   template: `
   <div style="border:solid; display:flex;">
        <div :style="'background-color:' + RGB +'; width:110px; height:110px;'"></div>
        <div style="display:flex; flex-direction:column; padding:10px;">
            <div>R: <input type="range" min=0 max=255 v-model="red" > red value</div>
            <div>G: <input type="range" min=0 max=255 v-model="green"> green value</div>
            <div>B: <input type="range" min=0 max=255 v-model="blue"> blue value</div>
        </div>
   </div>
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('ColorSelector', ColorSelector)
const vm= app.mount('#app');

