

Vue.component('countdownButton', {
  data: function() {
    return {
      internalTimeout: this.timeout,
    }
  },
  props: ['timeout'],
  created: function() {
    var intervalID = setInterval(() => {
      this.internalTimeout--;
      if (this.internalTimeout <= 0) {
        clearInterval(intervalID);
      }
    }, 1000);
  },
  template: `
    <button v-bind:disabled="internalTimeout > 0" v-on:click="$emit('buzz')">{{internalTimeout}}</button>
  `,
})


var vm = new Vue({
  el: "#app",
  data: {
    countdownOneClick: false,
    countdownTwoClick: false,
  },
  template: `<div>
    <countdownButton timeout="4"
    	v-on:buzz="countdownOneClick = true"></countdownButton>

    	{{countdownOneClick}} <br>

    <countdownButton timeout="3"
    	v-on:buzz="countdownTwoClick = true"></countdownButton>

    	{{countdownTwoClick}}
    </div>`,
})
