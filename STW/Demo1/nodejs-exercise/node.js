
// TODO
function raceN(list, N) {
    return new Promise((resolve, reject) => {
      let listaValores = []; // Almacena los valores resueltos de las promesas
      let numResueltas = 0; // Contador de promesas resueltas
  
      if (list.length != 0) {
        list.forEach(a => {
          a.then(v => {
            if (listaValores.length < N) {
              listaValores.push(v); // Agrega el valor resuelto a la listaValores
              numResueltas++; // Incrementa el contador de promesas resueltas
            }
          }).catch(err => reject(err)); // Rechaza la promesa en caso de error
  
          if (numResueltas == N) {
            resolve(listaValores); // Resuelve la promesa con listaValores si se alcanza el número requerido de promesas resueltas
          }
  
          if (numResueltas == listaValores.length) {
            resolve(listaValores); // Resuelve la promesa con listaValores si todas las promesas han sido resueltas
          }
  
          if (numResueltas != N) {
            reject(listaValores[0]); // Rechaza la promesa con el primer valor de listaValores si no se cumple el número requerido de promesas resueltas
          }
        });
      }
    });
  }
  