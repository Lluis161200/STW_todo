const options={
    data: function(){
        return {
            //aqui posem les variables de estat las que faran cambiar el html
            msg: "Hello",
            a:1,
            b:2,

        }
    },
    //v-bind sirve para que aparezca el valor de una de las variables en un form por ejemplo  <input type='text' v-bind:value="a"> 
    //v-model a parte de mostrar el valor si tu dentro del formulaio cambias ese valor el valor de la variable tambien cambia <input type='text' v-model="a"> 
    template: `
     <spam> {{msg}} {{(true)?a*b:99}} </spam>  
     <input type='text' v-model="a"> 
    `
    
    
}
const app = Vue.createApp(options)
const vm = app.mount('#app')