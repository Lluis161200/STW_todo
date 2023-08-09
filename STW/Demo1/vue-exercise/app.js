const RootComponent = {
  data() {
    return {
      forecast: [
        // Datos de pronóstico para cada día de la semana
        { weekday: "Wednesday", type: "Rainy",  temperature: 20, scale: "celsius" },
        { weekday: "Thursday", type: "Storms", temperature: 15, scale: "celsius" },
        { weekday: "Friday", type: "Rainy",  temperature: 16, scale: "celsius" },
        { weekday: "Saturday", type: "Clowdy", temperature: 21, scale: "celsius" },
        { weekday: "Sunday", type: "Sunny",  temperature: 29, scale: "celsius" },
        { weekday: "Monday", type: "Sunny", temperature: 30, scale: "celsius" },
        { weekday: "Tuesday", type: "Clowdy", temperature: 25, scale: "celsius" },
        { weekday: "Wednesday", type: "Rainy",  temperature: 20, scale: "celsius" },
        { weekday: "Thursday", type: "Storms", temperature: 15, scale: "celsius" },
        { weekday: "Friday", type: "Rainy",  temperature: 10, scale: "celsius" },
        { weekday: "Saturday", type: "Clowdy", temperature: 5, scale: "celsius" },
        { weekday: "Sunday", type: "Sunny",  temperature: 0, scale: "celsius" },
      ],
      charC: "ºC", // Símbolo para grados Celsius
      charF: "ºF", // Símbolo para grados Fahrenheit
      cEnable: false, // Habilita el botón de Celsius
      fEnable: true // Habilita el botón de Fahrenheit
    }
  },
  methods: {
    checkScale(scale) {
      if (scale == "celsius") {
        return this.charC; // Retorna el símbolo para Celsius
      } else {
        return this.charF; // Retorna el símbolo para Fahrenheit
      }
    },
    conversion() {
      if (this.forecast[0].scale == "fahrenheit") {
        // Conversión de Fahrenheit a Celsius
        this.forecast.forEach(day => {
          day.scale = "celsius"; // Cambia la escala a Celsius
          day.temperature = ((day.temperature - 32) / 1.8).toFixed(2); // Convierte la temperatura a Celsius
        });
        this.cEnable = false; // Deshabilita el botón de Celsius
        this.fEnable = true; // Habilita el botón de Fahrenheit
      } else {
        // Conversión de Celsius a Fahrenheit
        this.cEnable = true; // Habilita el botón de Celsius
        this.fEnable = false; // Deshabilita el botón de Fahrenheit
        this.forecast.forEach(day => {
          day.scale = "fahrenheit"; // Cambia la escala a Fahrenheit
          day.temperature = ((day.temperature * 1.8) + 32).toFixed(2); // Convierte la temperatura a Fahrenheit
        });
      }
    }
  },
  template: `
  <div>
    <h1>Current Week Forecast</h1>
    View in <button :disabled="!cEnable" @click="conversion()">ºC</button><button :disabled="!fEnable" @click="conversion()">ºF</button>

    <hr />

    <table>
      <tr>
        <th v-for="day in forecast">{{day.weekday}}</th>
      </tr>
      <tr>
        <td v-for="day in forecast">
          <span class="event">{{day.type}}</span>
          <span class="temperature">{{day.temperature + checkScale(day.scale)}}</span>
        </td>
      </tr>
    </table>
  </div>
  `
}

const app = Vue.createApp(RootComponent);
const vm = app.mount("#app");
