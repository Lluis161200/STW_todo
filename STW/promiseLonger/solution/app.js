
const LogViewer = {
  data() {
    return {
      messages: [],
      filtered_messages: [],
    }
  },
  created: function() {
    fetch("/global_log").then(res => res.text()).then(json => this.messages = this.filtered_messages = JSON.parse(json));
  },
  methods: {
    set_filter: function(needle) {
      this.filtered_messages = this.messages.filter(str => str.indexOf(needle) >= 0)
    }
  },
  template: `<h2>Messages</h2>
  <div>
  <ul><li v-for="message in filtered_messages">{{message}}</li></ul>
  <filter-component v-on:filter="set_filter($event)"></filter-component>
  </div>`
}

const FilterComponent = {
  data() {
    return {
      string: "",
      history: [],
    }
  },
  emits: ['filter'],
  template: `<div>
    <h2>Filter</h2>
    <input type="text" v-model="string">
    <button v-on:click="history.push(string); $emit('filter', string);">Set Filter</button>
    <button v-on:click="$emit('filter', '');string=''">Clear</button>
    <div class="stored-filter" v-for="h in history"><a v-on:click="$emit('filter', h);" href="#">{{h}}</a></div>
  </div>`,
}

let app = Vue.createApp(LogViewer);
app.component('filter-component', FilterComponent);
app.mount("#app");
//...
