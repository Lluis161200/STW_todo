// Component to implement
const BookingSlotComponent = {
  props: ['modelValue', 'bikeId', 'slotId'],
  emits: ['update:modelValue'],

  data() {
    return {
      colo: 'white',
      resposta: '',
      booked: false,
      clicked: false,
    };
  },
  watch: {
    modelValue: function () {
      if (this.booked == false && !this.clicked) {
        this.colo = 'gray';
        this.clicked=true
      }
    },

    resposta: function () {
      if (this.resposta == 'click') {
        this.colo = 'yellow';
      } else if (this.resposta == 'booked') {
        this.colo = 'green';
      } else if (this.resposta == 'rejected') {
        this.colo = 'red';
      }
    },
  },

  methods: {
    clicado: function (bikeId, slotId) {
      if (!this.clicked) {
        this.resposta = 'click';
        fetch('/book?bikeId=' + bikeId + '&slotId=' + slotId)
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            this.resposta = data;
            if (data == 'booked') {
              this.$emit('update:modelValue', true);
              this.booked = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.clicked = true;
      }
    },
  },

  template: `
    <span :style="'background-color:' + colo" :disabled="modelValue==true" @click="clicado(bikeId, slotId)">
      Bike:{{bikeId}} Slot:{{slotId}}
    </span>
  `,
};


// Do not modify
const RootComponent = {
  name: 'RootComponent',
  components: {BookingSlotComponent},
  data: () => {
    return {
      bikeBookedArray: [false, false, false, false, false]
    };
  },
  template: `
    <table style="">
      <tr style="border: 1px solid grey;">
        <th v-for="bikeIndex in 5" :key="bikeIndex">Bike {{bikeIndex}} slots</th>
      </tr>
      <tr v-for="slotIndex in 5" :key="slotIndex">
        <td v-for="(bikeIndex, index) in 5" :key="bikeIndex">
          <BookingSlotComponent
            :bikeId="bikeIndex"
            :slotId="slotIndex"
            v-model="bikeBookedArray[index]"
          />
        </td>
      </tr>
    </table>
  `
}

const app = Vue.createApp(RootComponent);
app.component('BookingSlotComponent', BookingSlotComponent);
const vm = app.mount("#app");
