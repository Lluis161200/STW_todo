
//== Backend =================================================================

const convolutedCryptoProvider = function(seed) {
  return new Promise(function(resolve, reject) {
    resolve({
      boolean: seed % 2 == 0, // Genera un booleano basado en el residuo de la división del seed entre 2
      next: () => convolutedCryptoProvider((seed * 13 + 1) % 25) // Retorna una nueva instancia de convolutedCryptoProvider con un nuevo seed calculado
    });
  });
}


// TODO

let getBooleanList = function(seed) {
  return new Promise((resolve, reject) => {
    let boolList = []; // Lista para almacenar los booleanos generados
    const getBool = (ccpObj) => {
      boolList.push(ccpObj.boolean); // Agrega el booleano generado a la lista
      if (boolList.length != 9) {
        ccpObj.next().then((resCcpObj) => {
          getBool(resCcpObj); // Genera el siguiente booleano recursivamente si no se han generado 9 booleanos
        });
      } else {
        resolve(boolList); // Resuelve la promesa con la lista de booleanos generados cuando se hayan generado los 9 booleanos
      }
    };
    convolutedCryptoProvider(seed).then(ccpObj => getBool(ccpObj)); // Obtiene la instancia de convolutedCryptoProvider y comienza a generar booleanos
  });
}

const Catcha = function(challenge) {
  this.getImages = function() {
    return new Promise((resolve, reject) => {
      getBooleanList(challenge).then(x => {
        let boolList = x;
        let catCounter = 0;
        let bikeCounter = 0;
        let images = boolList.map((bool) => {
          return (bool) ? `../img/cat${++catCounter}.png` : `img/bike${++bikeCounter}.png`; // Genera la ruta de las imágenes basada en los booleanos generados
        });
        resolve(images); // Resuelve la promesa con la lista de rutas de imágenes generadas
      });
    });
  }

  this.checkAnswer = function(listToCheck) {
    return new Promise((resolve, reject) => {
      let isCorrect = true;
      getBooleanList(challenge).then(boolList => {
        boolList.forEach((element, index) => {
          isCorrect = isCorrect && (element == listToCheck[index]); // Comprueba si los booleanos coinciden en cada posición y actualiza la variable isCorrect en consecuencia
        });
        resolve(isCorrect); // Resuelve la promesa con el resultado de la comprobación
      });
    });
  }
}




// == Some Tests You May Want To Use =========================================

// getBooleanList(7).then(x => console.log(x));


/*const c = new Catcha(7);
c.getImages().then(x => console.log(x));
c.checkAnswer([ false, false, true, true, 
	false, false, true, true, false ]).then(x => console.log(x));
*/

/*
for (let i = 0; i < 13; i++) {
  new Catcha(i).getImages().then(list => console.log(i + " " + list))
}
*/

//== Web Server ==============================================================

const express = require('express');
const { truncate } = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'vue')))
app.use(express.json());

app.get('/challenge', function(req, res) {

  if (typeof Catcha != "undefined") {
    const challenge = Math.floor(Math.random() * 13);
    const catcha = new Catcha(challenge);

    catcha.getImages().then(images => {
      res.json({ challenge: challenge, images: images });
    });
  } else {
    // Fallback
    res.json({ challenge: 'TODO', images:
      ['img/cat1.png','img/cat1.png','img/bike1.png',
      'img/bike1.png','img/bike1.png','img/bike1.png',
      'img/bike1.png','img/bike1.png','img/bike1.png']
    });
  }
});

app.post('/response/:challenge', function(req, res) {
  const catcha = new Catcha(req.params.challenge);
  const selected = req.body["selected"];

  catcha.checkAnswer(selected)
    .then(boolean => res.end(boolean ? "PASS": "FAIL"));
});

app.listen(3000, () => console.log(`Server listening on port 3000!`))
