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

