const RootComponent= {
    data(){
        return{
            label1: "crhono1",
            label2: "crhono2",
            

        }
    },
   //: es lo mismo que v-bind:
    template: `<FancyChrono :name="label1"></FancyChrono>
    <FancyChrono :name="label1"></FancyChrono>
    `

}
const FancyChrono={
    props: ['name'],
    data(){
        return{
            counter:0,
        }

    },
    created(){
        setInterval(()=>this.counter++,100);
    },
    template: `<div><span>{{name}}</span> <div><span>{{counter}}</span>
    <button @click="counter=0">Reset</button>
    </div>`
}

const app =Vue.createApp(RootComponent)
app.component('FancyChrono', FancyChrono)
const vm= app.mount('#app')
