const express = require('express');
const { write } = require('fs');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

const bookBikeModule = function() {
  let bikeTimeouts = {};

  const buildTimeout = function(bikeId) {
    return {
      state: 0, // 0: off, 1: on
      startTimeOut: function() {
        this.state = 1;
        setTimeout(() => {
          
          if (bikeTimeouts[bikeId]){
            bikeTimeouts[bikeId].resolve('booked');
              //delete bikeTimeouts[bikeId];
          }
         
        }, 5000);
      },
    };
  };

  const bookBike = function(bikeId, slotId) {
    return new Promise((resolve, reject) => {
      if (bikeId === slotId) {
        reject('rejected');
      } else 
      {
        if (bikeTimeouts[bikeId]) {//para verificar si ya existe una reserva de esa bikeId si es asi la rejectamos
          bikeTimeouts[bikeId].reject('rejected');
        }
        //la creacion del nuevo objeto para guardar la funcion resolve y reject desùes de haber rejecteado la promise anterioir si no haces reject de todo.
        bikeTimeouts[bikeId] = {
          resolve: resolve,
          reject: reject,
        };
        if(buildTimeout(bikeId).state==0)
        {
          buildTimeout(bikeId).startTimeOut();
        }
      }
    });
  };

  return {
    bookBike: bookBike,
  };
}();

app.get('/book', function(req, res) {
  if (typeof bookBikeModule !== 'undefined') {
    const bikeId = req.query.bikeId;
    const slotId = req.query.slotId;

    bookBikeModule.bookBike(bikeId, slotId)
    //resolve
      .then(result => {
        res.write(result);
        //res.end();
      })
      //reject
      .catch(error => {
        res.write(error);
        //res.end();
      }).finally(()=>{
        res.end()
      });
  } else {
    // Hardcoded response for when bookBike function is not implemented
    const randomBoolean = Math.random() < 0.5;
    setTimeout(() => {
      res.write(randomBoolean ? 'booked' : 'rejected');
      res.end();
    }, 1000);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
