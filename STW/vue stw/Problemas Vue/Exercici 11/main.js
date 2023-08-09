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

