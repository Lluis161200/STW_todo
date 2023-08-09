const RootComponent= {
    data(){
        return{
           counterYes: 0 ,
            

        }
    },
    methods:{
        processYes(nYes){
            console.log('yes')
            this.counterYes += nYes;
        }
       

    },
   //: es lo mismo que v-bind:
    template: `<Yes @yes-text="processYes" ></Yes> <br/>
    <span>{{counterYes}}</span>
    `

}
const Yes={
    emits:['yes-text'],
    data(){
        return{
            buffer: '',
        }

    },
    watch:{
        buffer: function(){
            if(this.buffer.include("yes")){
                this.$emit('yes-text')

            }
        }

    },


    template: `<input type=text v-model='buffer> 
    <button @click=$emit('yes-text')> Yes </button>`
    
}

const app =Vue.createApp(RootComponent)
app.component('Yes', Yes)
const vm= app.mount('#app')
