const rootComponent={
    data() {
        return {
            buffer: '',
           

        }
    },
    //acordarse de hacer el v-bind (:) en words
    template: `
    <input type="text" v-model="buffer">
    <WordsToList :words="buffer"></WordsToList>
    `
}


const WordsToList={
    props:['words'],
    methods:{
        toArray(){
            return this.words.trim().split(' ')
        }

    },

   template: `
   <ul>
        <li v-if="words!=''"v-for="element in  toArray()">{{element}}</li>
   </ul>
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('WordsToList', WordsToList)
const vm= app.mount('#app');

