
//== Root Component ==========================================================

const RootComponent = {
  data: function() {
    return {
      flights: [],
      loading: true,
      error: false,
      range: { min: 50, max: 600 }, //son las bolitas min bola izquierda max bola derecha
      thresholds: [0, 50, 60, 90, 100, 110, 150, 200, 250, 300, 350,
        400, 450, 500, 550, 600, 650, 700, 750 ],
    }
  },
  mounted: function() {
    this.fetchFlights();
  },
  watch: {
    range: function() {
      this.fetchFlights();
    },
  },
  methods: {
    fetchFlights: function() {
      this.loading = true;

      fetch(`/flights/${this.range.min}/${this.range.max}`)
      .then(res => res.json())
      .then(json => {
        this.loading = false;
        if (Array.isArray(json)) {
          this.flights = json
          this.error = false;
        } else {
          this.error = true;
        }
      })
      .catch(error => console.log('Error' + error));
    }
  },
  //cuando tenemos v-model en el component sera props modelValue y emit update:modelValue
  template:`
    <Range-Filter v-model="range" v-bind:thresholds="thresholds"></Range-Filter>
    (your price range is from {{range.min}} to {{range.max}})
    <button v-on:click="this.range.min = 50; this.range.max = 600;">Reset</button>
    <ul>
      <span v-if="loading">Loading...</span>
      <span v-else-if="error">Uops! Something went wrong!</span>
      <li v-else v-for="flight in flights">
        <span>{{flight.from}} - {{flight.to}} - {{flight.price}}</span>
      </li>
    </ul>
    `
}

//== Range Filter Component ==================================================

/*
Note: use this syntax to watch a nested field

   watch: {
    'object.field': function() { ...  },
*/

const RangeFilterComponent = { // TODO
  props:['modelValue', 'thresholds'],
  emits:['update:modelValue'],


  data(){
    return{
      bulletChar:'●',
      lineChar:'—',
      leftBullet:'black',
      rightBullet:'black',

    }
  },

  methods:{
    getChar(threshold){
      if((threshold==this.modelValue.min) || (threshold==this.modelValue.max))
      {
        return this.bulletChar
      }else{
        if((threshold>this.modelValue.min && threshold<this.modelValue.max))
        {
          return this.lineChar

        }else{
          return ''
        }
        
      }

      
      //return ((threshold==this.modelValue.min) || (threshold==this.modelValue.max)) ? this.bulletChar : ((threshold>this.modelValue.min && threshold<this.modelValue.max))?this.lineChar : ''

    },

    getCharColor(threshold){
      if(threshold==this.modelValue.min){
        return this.leftBullet
      }else{
        if(threshold==this.modelValue.max){
          return this.rightBullet
        }
        else{
          return 'black'
        }
      }
    },
    toggleLeftBullet(){
      if(this.leftBullet=='black')
      {
        this.leftBullet='green'
        if(this.rightBullet=='green'){
          this.rightBullet='black'
        }
      }else{
        this.leftBullet='black'
      }

    },
    toggleRightBullet(){
      if(this.rightBullet=='black')
      {
        this.rightBullet='green'
        if(this.leftBullet=='green'){
          this.leftBullet='black'
        }
      }else{
        this.rightBullet='black'
      }

    },

    chechkCell(threshold){
      if(threshold==this.modelValue.min){
        this.toggleLeftBullet()
      }else if(threshold==this.modelValue.max){
        this.toggleRightBullet()
      }else{
        if((this.leftBullet=='green') && (threshold < this.modelValue.max)){
          this.$emit('update:modelValue', {min: threshold, max:this.modelValue.max })
          this.toggleLeftBullet()
        }else if((this.rightBullet=='green') && (threshold > this.modelValue.min)){

          this.$emit('update:modelValue', {min: this.modelValue.min, max:threshold })
          this.toggleRightBullet()         
        }
      }

    }

  },


  template: `
  <div class="range">
    <div v-for="threshold in thresholds">
      <div class="range-item" :style="'color:'+ getCharColor(threshold)" @click=chechkCell(threshold)>{{getChar(threshold)}}</div>
      <span class="range-threshold">{{threshold}}</span>
    </div>
    
  </div>`
}

//== Instance ================================================================

const app = Vue.createApp(RootComponent);
app.component('Range-Filter', RangeFilterComponent);
const vm = app.mount("#app");
