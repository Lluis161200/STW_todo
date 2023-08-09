const options= {
    data(){
        return{
            rootChecked: false,
        }
    },
   
    template: `<input type="checkbox" v-model="rootChecked"> <br/>  
    <doubleCheckBox v-model="rootChecked"></doubleCheckBox>
    `
}
//para que el root le pase información de un valor a los componentes usar en el componente props y al reves para dar informacion de esa variable
//desde los componentes hacia el root usamos emit

const doubleCheckBox={

    props: ['modelValue'],
    emits: ['update:modelValue'],
    data(){
        return {
            checked1: false,
            checked2: false,

        }
    },
    created(){
        this.checked1=this.modelValue
        this.checked2=this.modelValue

    },
    watch:{
        modelValue(){
            console.log(this.modelValue)
            if(this.modelValue===true){
                console.log('estoy')
                this.checked1=true
                this.checked2=true
            }
            if((this.modelValue===false) && (this.checked1===true) && (this.checked2===true) ){
                console.log('hola')
                this.checked1=false
                this.checked2=false
                
            }
            
        }

    },
    methods:{
        doCheck1(state){
            this.checked1=state;
            this.$emit('update:modelValue', this.checked1 && this.checked2)
        },

        doCheck2(state){
            this.checked2=state;
            this.$emit('update:modelValue', this.checked1 && this.checked2)
        }

    },
    //$event.target.checked:: valor en el que esta la checkbox (True or False)
    template: `
        <input type="checkbox" v-model="checked1"
            @input="doCheck1($event.target.checked)">
        <input type="checkbox" v-model="checked2"
            @input="doCheck2($event.target.checked)">
    `

}


const app =Vue.createApp(options)
app.component('doubleCheckBox', doubleCheckBox)
const vm= app.mount('#app')
