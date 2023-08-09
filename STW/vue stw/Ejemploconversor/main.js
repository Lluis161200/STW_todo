const options= {
    data(){
        return{
            litres: 0,
            cn3: 0,
            

        }
    },
    //crear funciones para despues usar  Cubits: <input type='number' v-bind:value="toCn3()">
    methods:{
        toCn3: function(){
            this.cn3= this.litres*1000
        },
        
        toLitres: function(){
            this.litres= this.cn3/1000
        }
    },
    //funciones reactivas estas cambian los valores de las variables de data Cubits: <input type='number' v-bind:value="toCn3">     LO BUENO DE ESTE ES QUE SI LITERS NO CAMBIA LA FUNCION NO SE EJECUTA ASI QUE HAY MENOS GASTOS DE COMPUTACIÓN 
    computed:{
       
    },
    watch:{
        litres: function(){
            this.toCn3()
        },

        cn3: function(){
            this.toLitres()
        }

    },
    template: `
    Litres: <input type='number' v-model="litres"><br>
    Cubits: <input type='number' v-model="cn3">
    `

}

const vm = Vue.createApp(options).mount('#app')

