
// TODO



waitForAll = function(lista) {
    return new Promise((resolve, reject) => {
      const wait = setInterval(() => {
        let done = true;
  
        lista.forEach(element => {
          try {
            if (!element()) { // Verifica si el elemento de la lista aún no está completo
              done = false; // Indica que aún no se han completado todos los elementos
            }
          } catch (err) {
            reject(err); // Rechaza la promesa si ocurre un error
            clearInterval(wait); // Limpia el intervalo de espera
          }
        });
  
        if (done) {
          resolve(true); // Resuelve la promesa si todos los elementos se han completado
          clearInterval(wait); // Limpia el intervalo de espera
        }
      }, 10);
    });
  }
  





// 1
result = waitForAll([() => true]);
result.then(m => console.log("1) ", m));
// Resultat: 1) true

// 2
result = waitForAll([() => "hola", () => 23]);
result.then(m => console.log("2) ", m));
// Resultat: 2) true

// 3
var bool = false;

result = waitForAll([() => bool, () => true]);
setTimeout(() => bool = true, 100); 
console.log("3) ", bool);
result.then(m => console.log("3) ", m));
// Resultat: 3) false
//           3) true

// 4
var bool1 = false, bool2 = false;

result = waitForAll([() => bool1, () => bool2]);
var id1 = setInterval(() => bool1 = !bool1, 40); 
var id2 = setInterval(() => bool2 = !bool2, 60); 
setTimeout(() => { clearInterval(id1); clearInterval(id2) }, 500);
result.then(m => console.log("4) ", m));
// Resultat: 4) true

// 5
var anotherBool = false;

result = waitForAll([() => true, () => { if(anotherBool) throw "Error 123" }]);
setTimeout(() => anotherBool = true, 100); 
result.catch(m => console.log("5) ", m));
// Resultat: 5) Error 123

// Your tests here

