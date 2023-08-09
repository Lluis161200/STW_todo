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

