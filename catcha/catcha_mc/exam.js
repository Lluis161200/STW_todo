
//== Backend =================================================================

const convolutedCryptoProvider = function(seed) {
  return new Promise(function(resolve, reject) {
    resolve({
        boolean: seed % 2 == 0,
        next: () => convolutedCryptoProvider((seed * 13 + 1) % 25)
      });
  });
}

// TODO

// ... Catcha ...



// == Some Tests You May Want To Use =========================================

// getBooleanList(7).then(x => console.log(x));

/* 
const c = new Catcha(7);
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
