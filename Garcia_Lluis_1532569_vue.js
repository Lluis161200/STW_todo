//PROBLEMA 1

const options = {
    data: function(){
        
        return {
            counter: 0
        }
    },
    tempate: `<spam>{{counter}}</spam>`
}
const vm = Vue.createApp(options).mount('#app');
setInterval(() => vm.counter++, 100);

//PROBLEMA 2

const options = {
    data: function(){
        
        return {
            a: 0,
            b: 1,
        }
    },
    template: `<input type='number' v-model="a"> 
    <input type='number' v-model="b">
    <span> {{a+b}}</span>`
    
}
const app = Vue.createApp(options)
const vm= app.mount('#app');


//PROBLEMA 3

const options = {
    data: function(){
        
        return {
            clicked: false,
        }
    },
    template: `<button v-if="!clicked" @click="clicked = true"> Click me</button>`
    
}
const app = Vue.createApp(options)
const vm= app.mount('#app');

//PROBLEMA 4

const options = {
    data: function(){
        
        return {
            clicked: false,
        }
    },
    template: `<button v-bind:disabled="clicked" @click="clicked = true"> Click me</button>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');


//PROBLEMA 5

const options = {
    data: function(){
        return {
            buffer: '',
        }
        
    },
    watch: {
        buffer(){
            if(this.buffer.length >= 5){
                this.buffer= ""

            }
        }

    },
    

    template: `<input type="text" v-model="buffer">`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

//PROBLEMA 6

const options = {
    data: function(){
        return {
            buffer: '',
            bgColor: 'white',
        }
        
    },

    template: `<input v-bind:style="{'background-color': bgColor}" 
    @keydown="bgColor='red'"
    @keyup="bgColor='white'" 
    type="text" v-model="buffer">`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');


//PROBLEMA 7

const options = {
    data: function(){
        return {
            redness:0,
        }
        
    },

    template: `
    <div>
        <div :style="'color: hsl(0,'+redness+'%,50%)'">AM I RED?</div>
        <input type="range" min="0" max="100" v-model="redness">
        <div v-if="redness>=70">YES!</div>
    </div>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

//PROBLEMA 8

const options = {
    data: function(){
        return {
            a: false,
            b: false,
            c: false,
            d: false,

        }
        
    },
    watch:{
        a(){
            this.b=this.a

        },
        b(){
            this.c=this.a

        },
        c(){
            this.d=this.c

        },

    },

    template: `
    <input type="checkbox" v-model="a">
    {{a}} {{b}} {{c}} {{d}}`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');


//PROBLEMA 9

const options = {
    data: function(){
        return {
            a: false,

        }
        
    },
    computed:{
        b(){
            return this.a

        },
        c(){
            return this.b

        },
        d(){
            return this.c

        },

    },

    template: `
    <input type="checkbox" v-model="a">
    {{a}} {{b}} {{c}} {{d}}`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

//PROBLEMA 10

const options = {
    data: function(){
        return {
            book:[
                { name: 'Jaime Sommers', phone: '311-555-2368' },
                { name: 'Ghostbusters', phone: '555-2368' },
                { name: 'Mr. Plow', phone: '636-555-3226' },
                { name: 'Gene Parmesan: Private Eye', phone: '555-0113' },
                { name: 'The A-Team', phone: '555-6162' },
                ],
                
           

        }
        
    },
    //v-for para iterar un array

    template: `
    <table><tr><th>Name</th><th>Phone number</th></tr>
        <tr v-for="item in book">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
        </tr>
    </table>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

//PROBLEMA 11

const options = {
    data: function(){
        return {
            book:[
                { name: 'Jaime Sommers', phone: '311-555-2368' },
                { name: 'Ghostbusters', phone: '555-2368' },
                { name: 'Mr. Plow', phone: '636-555-3226' },
                { name: 'Gene Parmesan: Private Eye', phone: '555-0113' },
                { name: 'The A-Team', phone: '555-6162' },
                ],
                
           

        }
        
    },
//array.splice(index, cantidad de cosas que quieres borrar desde el index)
    methods:{
        remove(index){
            this.book.splice(index, 1)
        }

    },
    //v-for para iterar un array (item, index) item es cada objeto del array y el index el id
    // 

    template: `
    <table><tr><th>Name</th><th>Phone number</th> <th></th></tr>
        <tr v-for="(item, index) in book">  
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td><button @click="remove(index)"> Delete </button></td>
        </tr>
    </table>`
    
}
const app = Vue.createApp(options)  
const vm= app.mount('#app');

//PROBLEMA 12

const options={
    data() {
        return {
            state: 0,
            redLight:{on:'red', off:'indianRed', current:'indianRed'},
            yellowLight:{on:'yellow', off:'khaki', current:'khaki'},
            greenLight:{on:'lime', off:'seagreen', current:'lime'},

        }
    },
    methods:{
        switchState(){
            this.state=(this.state+1)%3;
            switch(this.state){
                case 0:
                    this.greenLight.current=this.greenLight.on;
                    this.redLight.current=this.redLight.off;
                    break;
                case 1:
                    this.greenLight.current=this.greenLight.off;
                    this.yellowLight.current=this.yellowLight.on;
                    break;
                case 2:
                    this.yellowLight.current=this.yellowLight.off;
                    this.redLight.current=this.redLight.on;
                    
            }

        }

    },
    template: `
    <div style="display: inline-block; width:30px;">
        <div :style="'height: 30px; background-color: '+ redLight.current"></div>
        <div :style="'height: 30px; background-color: '+ yellowLight.current"></div>
        <div :style="'height: 30px; background-color: '+ greenLight.current"></div>
        <div><button @click="switchState">Switch</button></div>
    </div>`
    }
    
const app = Vue.createApp(options)  
const vm= app.mount('#app');



//PROBLEMA 13

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



//PROBLEMA 14

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


//PROBLEMA 15

const rootComponent={
    data() {
        return {
            buffer: '',
            mostrar: false,
           

        }
    },
    //acordarse de hacer el v-bind (:) en words
    template: `
    <input type="text" v-model="buffer">
    <button @click="mostrar=true">Conversion</button>
    <WordsToList :words="buffer" v-if="mostrar"></WordsToList>
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




//PROBLEMA 16

const rootComponent={
    data() {
        return {
            person: {
                name: 'My Name',
                picture: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY
                AAAAfFcSJAAAADUlEQVR42mM82Mz1HwAFqgJP3gasfwAAAABJRU5ErkJggg==`,
                email: 'me@somerandomdomain.com',
                phone: '+00 00 000 0000',
                }
           

        }
    },
    //acordarse de hacer el v-bind (:) en words
    template: `
    <div style="display:flex;">
        <Card v-bind:personal-data="person"></Card>
    </div>
    `
    ,
    
}


const Card={
    props:['pearson'],
    

    template: `
    <div class="card">
        <div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY
            AAAAfFcSJAAAADUlEQVR42mM82Mz1HwAFqgJP3gasfwAAAABJRU5ErkJggg==">
        </div>
        <div><h1>My Name</h1></div>
        <div>me@somerandomdomain.com</div>
        <div>+00 00 000 0000</div>
    </div>
   
    
        
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('Card', Card)
const vm= app.mount('#app');




//PROBLEMA 17

const rootComponent={
    data() {
        return {
            state:'',
            
                     

        }
    },
    methods:{
        onMet(){
            this.state='just turned on'
        },

        offMet(){
            this.state='just turned off'

        }


    },
    
    template: `
    <div>
        <SwitchButton v-on:on="onMet" v-on:off="offMet"></SwitchButton> 
        {{state}}
    </div>
    `
    ,
    
}


const SwitchButton={
    emits:["on", "off"],
    props:["mostrar"],
    data(){
        return{
            mostra: false
        }
    },
    methods:{
        onMet(){
            this.mostra=true
            this.$emit('on')
        },

        offMet(){
            this.mostra=false
            this.$emit('off')

        }

    },
    
    template: `
    <div style="border:solid;display:inline-block">
        <button :disabled="mostra" @click="onMet">ON</button>
        <button :disabled="!mostra" @click="offMet">OFF</button>
    </div>
   
        
   `

}
   
const app = Vue.createApp(rootComponent)  
app.component('SwitchButton', SwitchButton)
const vm= app.mount('#app');

//PROBLEMA 18

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




//PROBLEMA 19


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

