const RootComponent= {
    data(){
        return{
            label1: "crhono1",
            label2: "crhono2",
            

        }
    },
   //: es lo mismo que v-bind:
    template: `<FancyChrono :name="label1"></FancyChrono>
    <FancyChrono :name="label2"></FancyChrono>
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
    template: `
    <div>
        <span>{{name}}</span> <div><span>{{counter}}</span>
        <SecureButton @secure-click="counter=0">Hola</SecureButton>
    </div>`                                                        // ^aqui
}
const SecureButton={
    emits:['secure-click'], 
    data(){
        return{
            isChecked: false,
        }

    },
    template:`
    <input type="checkbox" v-model="isChecked">
    <button @click="$emit('secure-click')" :disabled="!isChecked"><slot></slot></button>` //el slot este hace que cuando usemos ese component en este caso arriba e nombre que pongamos arriba sera el nombre del secure button

}

const app =Vue.createApp(RootComponent)
app
.component('FancyChrono', FancyChrono)
.component('SecureButton', SecureButton)
const vm= app.mount('#app')
