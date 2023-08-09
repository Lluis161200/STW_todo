
//== Backend =================================================================

// Airlines

const AirEuropa = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      resolve([
        { from: 'Barcelona', to: 'Paris', price: 100 },
        { from: 'Berlin', to: 'Rome', price: 200 },
      ])
    });
  }
}

const Delta = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(() =>
        resolve([
          { from: 'New York', to: 'Barcelona', price: 700 },
        ])
      , 30);
    });
  }
}

let ryanairWillTimeout = false;

const Ryanair = {       // this airline  timeouts
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      if (! ryanairWillTimeout) {
        resolve([
          { from: 'Budapest', to: 'Berlin', price: 55 },
        ])
      }
      ryanairWillTimeout = ! ryanairWillTimeout;
    });
  }
}

const Vueling = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      resolve([
        { from: 'London', to: 'Luxemburg', price: 150 },
        { from: 'New York', to: 'Barcelona', price: 300 },
      ])
    });
  }
}

// TODO

const flightsServer = {
  airlines:[AirEuropa, Delta, Ryanair, Vueling],
  getFilteredFlights: function(min , max){
    return new Promise((resolve, reject)=>{
      let resolved=false
      let airlinesResolvd=0
      let filteredFlights=[]
      this.airlines.forEach(airline => {
        setTimeout(()=>{
          if(!resolved){
            resolve(filteredFlights)
            resolved=true;
          }
          
        }, 500)
        airline.getFlights()
        .then((flights)=>{
          
          flights.forEach(element=>{
            if((element.price>=min) && (element.price<=max)){
              filteredFlights.push(element)
            }
          })
          if((++airlinesResolvd==this.airlines.length) && !resolved){
            resolve(filteredFlights)
            resolved=true;
          }


        })
      
      });

    })
    


  }
}

//http://localhost:3000/flights/90/110 PARA PROBAR SOLO EL BACKEND
const { rejects } = require('assert');
//== Web Server ==============================================================

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'vue')))
app.use(express.json());

app.get('/flights/:min?/:max?', (req, res) => {
  if (typeof flightsServer != "undefined") {
    flightsServer.getFilteredFlights(req.params.min, req.params.max)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({error}));
  } else {
    // hardcoded response for when flightsServer is not implemented
    res.json(
    [{"from":"Barcelona","to":"Paris","price":100},
    {"from":"Berlin","to":"Rome","price":200},
    {"from":"Budapest","to":"Berlin","price":55},
    {"from":"London","to":"Luxemburg","price":150},
    {"from":"New York","to":"Barcelona","price":300}]);
  }
});

app.listen(3000, () => console.log(`Server listening on port 3000!`))
