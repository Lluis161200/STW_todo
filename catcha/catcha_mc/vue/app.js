
//== Root Component ==========================================================

const RootComponent = {
  data() {
    return {
      challenge: null,
      images: [],
      isSelected: [],
      answer: "",
    };
  },
  methods: {
    postAnswer() {
      fetch(`/response/${this.challenge}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "selected": this.isSelected })
      })
      .then(response => response.text())
      .then(text => this.answer = text);
    }
  },
  mounted() {
    fetch(`/challenge`)
      .then(res => res.json())
      .then(json => {
        this.challenge = json.challenge
        this.images = json.images
        this.isSelected = this.images.map(() => false)
      })
  },
  template: `
    (challenge: {{challenge}})
    <table>
      <tr v-for="row in [0,1,2]">
        <td v-for="col in [0,1,2]">
          <selectable-image-component v-bind:src="images[row * 3 + col]"
              v-model="isSelected[row * 3 + col]" />
        </td>
      </tr>
    </table>
    <button v-on:click="isSelected = images.map(() => false)">Reset</button>
    <button v-on:click="postAnswer">Validate</button> {{answer}}
  `,
};

//== Selectable Image Component ==================================================

// const SelectableImageComponent = ...

//== Instance ================================================================

const app = Vue.createApp(RootComponent);
app.component('selectable-image-component', SelectableImageComponent);
const vm = app.mount("#app");
