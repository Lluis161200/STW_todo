const rootComponent={
    data() {
        return {
           

        }
    },
    
    template: `
    <WordsToList words="Lorem ipsum dolor sit amet"></WordsToList>
    `
}

const WordsToList={
    props:['words'],

   template: `
   <ul>
        <li v-for="element in words.trim().split(' ')">{{element}}</li>
   </ul>
   `

}




    
const app = Vue.createApp(rootComponent)  
app.component('WordsToList', WordsToList)
const vm= app.mount('#app');

