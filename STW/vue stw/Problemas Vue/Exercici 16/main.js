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

