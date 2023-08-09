//PROBLEMA 1
var f1=function(a){console.log(a)}
f1(3)

//PROBLEMA 2

var f2=function(a){return (a>=0)? 2*a :-1}
console.log('P2: ', f2(1))
console.log('P2: ', f2(-1))


//PROBLEMA 3
var llista2=[]
f3=function(llista){
    return llista.map(x=>{
         return f2(x)+23
    })    
}
var l=[1,2,3]
var llista3=f3(l)
console.log('P3: ' , llista3)


//PROBLEMA 4

console.printaki= function(){
    console.log('aqui')
}
console.printaki()

//PROBLEMA 5

var f4=function(a,b){return a+b}
var lista=[1,2,3,4]
var llistaB=lista.map(x=> {
    return f4(x,23)
})
console.log('P5: ', llistaB)

//PROBLEMA 6

var f5=function(a,b,c){
    c(b(a))
}
f5(1,f2,function(r){console.log(r)})

//PROBLEMA 7
/*
//opcio 1
console.printaki2= function(){
    let cont=0;
    return ()=>{
        console.log('aqui', ++cont)
    }
    
}()
console.printaki2()
console.printaki2()

//opcio 2
let registerPrintaki2=()=>{
    let i=1;
    console.printaki2=()=>{
        console.log(`aqui ${i++}`)
    }
}
registerPrintaki2()
console.printaki2()
console.printaki2()
*/
//opcio 3
let aux = ()=>{
    let i=1;
    return ()=>{
        i++;
    }
}
let inc=aux();
console.printaki2=()=>{
    console.log(`aqui ${inc()}`)
    return inc()

}

console.printaki2()

console.printaki2()

const { rejects } = require('assert')

//PROBLEMA P8

const fs=require('fs')
const { resolve } = require('path')
let f6=function(llista, callback){
    let resultat=[];
 
    llista.forEach(x=>{
        fs.readFile(x, 'utf-8', (err, data)=>{
            
            resultat.push(data)
            
            if(resultat.length==llista.length)
            {
                callback(resultat);
    
            }

        })
       
            
    })
}
//f6(['hola.txt','hola2.txt'], function (result) { console.log(result)})

//PROBLEMA 9
const fs=require('fs')
let f7 = function (llista, callback) {
    let resultat = [];
  
    llista.forEach(function (x) {
      fs.readFile(x, 'utf-8', function (err, data) {
        resultat.push(data);
  
        if (resultat.length === llista.length) {
          callback(resultat);
        }
      });
    });
};
  
f7(['hola.txt','hola2.txt'], function (result) { console.log(result)})

//PROBLEMA 10

// Que se ejecute antes el fs.readfile que el foreache que corresponde usando un index equivocado.


//PROBLEMA 11

let asyncMap=function(list, funcu, callback2)
{
    let resultlist=[]
    list.forEach((element, index)=>{
        f(element, (err, result)=>{
            if(err){
                callback2(err, null)
            }
            else{
                resultlist[index]=result;
            }       
        })
        if(resultlist.length==list.length)
        {
            callback2(null, resultlist)
        }
    })    
}
//PROBLEMA 12

var obj={
    count:0,
   
    notify:null,
    inc:function(){
            
            if(this.notify){this.notify()}
        }
    
    
}
//let o1=new obj;
obj.count = 1; 

obj.notify = function() { console.log('notified') }; 
obj.inc()
obj.inc()
obj.inc()


//PROBLEMA 13

var o2 = (function() {
    var count = 1;
    var notifyFunc;
  
    return {
      setNotify: function(func) {
        notifyFunc = func;
      },
      inc: function() {
        count++;
        if (notifyFunc) {
          notifyFunc(count);
        }
      }
    };
})();

o2.setNotify(function(a) {console.log(a);});
o2.inc();

//PROBLEMA 14

class Counter {
    constructor() {
      this.counter = 1;
      this.notifyFunc = null;
    }
  
    setNotify(func) {
      this.notifyFunc = func;
    }
  
    inc() {
      this.counter++;
      if (this.notifyFunc) {
        this.notifyFunc(this.counter);
      }
    }
    count() {
        return this.counter;
    }
  
  
}
  
const o3obj = new Counter();
o3obj.setNotify(function(counter) {console.log(counter);});
o3obj.inc();


//PROBLEMA 15



class DecreasingCounter extends Counter{
    constructor() {
      super(); 
    }
  
    inc() {
      this.counter--;
      if (this.notifyFunc) {
        this.notifyFunc(this.counter);
      }
    }
  }
  
  const o4 = new DecreasingCounter();
  
  
  o4.setNotify(function(counter) {
    console.log(counter);
  });
  o4.inc();
  

//PROBLEMA 16


let readIntoFuture=function(filename){
    let future={isDone:false, result:null}
    fs.readFile(filename, 'utf-8', (err,data)=>{
        future.isDone=true;
        if(!err){
            future.result=data;
        }
        
    })
    
    return future;

}

future=readIntoFuture('hola.txt');
console.log(future)



//PROBLEMA 17


let asyncToFuture=function(f){
    return function(x){
        let future={isDone:false, result:null}
        f(x, (err, data)=>{
            future.isDone=true;
            future.result=data;
        })
        return future;
    }
}

readIntoFuture2 = asyncToFuture(fs.readFile);
future2a = readIntoFuture2('hola.txt');
setTimeout(function() { console.log(future2a) }, 1000)
future2a.result+""


//PROBLEMA 18
let asyncToEnhancedFuture=function(f){
    return function(x){
        let enhancedFuture = { isDone: false, result: null, notify: null,
            registerCallback: function(callba){
                this.notify=callba
                if(this.isDone==true){
                    this.notify(this)
                }
            } 
        }
        f(x, (err, data)=>{
            enhancedFuture.isDone=true
            if( enhancedFuture.notify){
                enhancedFuture.notify(enhancedFuture)
            }
            enhancedFuture.result=data
        })
        return enhancedFuture;

    }
}


//PROBLEMA 19
let when=function(f1){
    let obj= {
        do: function(f2){
            f1(f2)
        }
    }
    return obj
}


f1 = function(callback) { fs.readFile('hola.txt', 'utf-8', callback) }
f2 = function(error, result) { console.log(result) }

//PROBLEMA 20

const fs = require('fs');

let when = function(f1) {
  let obj = {
    and: function(f2) {
      return {
        do: function(f3) {
          let count = 0;
          let results = [];
          function callback(err, res) {
            count++;
            results.push(res);

            if (count === 2) {
              f3(null, null, results[0], results[1]);
            }
          }

          f1(callback);
          f2(callback);
        }
      };
    }
  };

  return obj;
};  

  f1 = function(callback) { fs.readFile('hola.txt', 'utf-8', callback) }
  f2 = function(callback) { fs.readFile('hola2.txt', 'utf-8', callback) }
  f3 = function(err1, err2, res1, res2) { console.log(res1, res2) }
  when(f1).and(f2).do(f3)

//PROBLEMA 21

composer = function(f1, f2) {
    return function(x) {
      return f1(f2(x));
    };
  };

f1 = function(a) { return a + 1 }
f3 = composer(f1, f1)
console.log(f3(3))

f4 = function(a) { return a * 3 }
f5 = composer(f3, f4)
console.log(f5(3))


//PROBLEMA 22

asyncComposer = function(f1, f2) {
    return function(a, callback) {
      f2(a, function(error, res1) {
        if (error) {
          callback(error);
        } else {
          f1(res1, function(error, res2) {
            if (error) {
              callback(error);
            } else {
              callback(null, res2);
            }
          });
        }
      });
    };
  };
  
f1 = function(a, callback1) { callback1(null, a + 1) }
f2 = function(a, callback2) { callback2(null, a + 2) }
f3 = asyncComposer(f1, f2)
f3(3, function(error, result) { console.log(result) } )

//PROBLEMA 23
//a) Promise resolata a 7
//b) Promise resolata a 6
//c) Promise resolata a 11 entra en el ultimo then igalmente que no entre en el catch
//d) Promise resolata a 12
//e) Promise resolata a 2


//PROBLEMA 24
let antipromise=(p)=> new Promise((resolve, reject)=>{
    p.then(x=>reject(x)).catch(x=>resolve(x))
})

antipromise(Promise.reject(0)).then(console.log);


//PROBLEMA 25

let promiseToCallback = (f) => {
    return (x, cb)=>{
        f(x).then((res)=> cb(null, res)).catch(err=>cb(err, null))
    }
}


//PROBLEMA 26

let readToPromise = (file)=>{
    return new Promise ((resolve, reject)=>{
        fs.readFile(file, 'utf-8', (err, res)=>{
           (!err) ? resolve(res) : reject(err)
        })
    })
}


//PROBLEMA 27

let callbackToPromise = (f) =>{
    return (x)=>{
        return new Promise((resolve, reject)=>{
            f(x,(err,res)=>{
                (!err)? resolve(res): reject(err)
            })
        })
    }
}


//PROBLEMA 28


const readIntoEnhancedFuture=require('./18').readIntoEnhancedFuture //./18 es el ejercicio 18 hay que ejecutarlo

let enhancedFutureToPromise=(enhancedF)=>{
    return new Promise((resolve, reject)=>{
        enhancedF.registerCallback=function(cb){
            this.notify=function(cb){
                cb(this.enhancedF)
                resolve(this.result) 
            }
        }
    })
}



//PROBLEMA 29

let mergedPromise=p=>
    new Promise((resolve)=>{
        p.then(res=>{resolve(res)}).catch(err=>resolve(err))
        //p.then(resolve).catch(resolve) ESTO TAMBIEN SE PUEDE HACER
    })


mergedPromise(Promise.resolve(0)).then(console.log);
mergedPromise(Promise.reject(1)).then(console.log);


//PROBLEMA 30

const promiseComposer = function(f1, f2) {
    return function(x) {
      return f2(x)
        .then(result => f1(result))
        .catch(error => Promise.reject(error));
    };
  };

var f1 = x => new Promise((resolve, reject) => resolve(x + 1));
promiseComposer(f1, f1)(3).then(console.log);
var f2 = x => new Promise((resolve, reject) => reject('always fails'));
promiseComposer(f1, f2)(3).catch(console.log);
var f3 = x => new Promise((resolve, reject) =>
setTimeout(() => resolve(x * 2), 500));
promiseComposer(f1, f3)(3).then(console.log);


//PROBLEMA 31

const parallelPromise = function(promise1, promise2) {
    return Promise.resolve(promise1)
      .then(result1 => {
        return Promise.resolve(promise2)
          .then(result2 => {
            return [result1, result2];
          });
      });
  };
  
  var p1 = parallelPromise(Promise.resolve(0), Promise.resolve(1));
  p1.then(console.log);
  
  var plast = new Promise((resolve, reject) =>
  setTimeout(() => resolve('left'), 200));
  var pfirst = new Promise((resolve, reject) =>
  setTimeout(() => resolve('right'), 100));
  var p2 = parallelPromise(plast, pfirst);
  p2.then(console.log);

//PROBLEMA 32



let promiseBarrier = (n)=>{
    funciones= []
    params=[]
    resolves=[]
    let counter=0;

    let func = function(x){
        return new Promise((resolve,reject)=>{
            //console.log(x)
            params.push(x)
            resolves.push(resolve)
            counter++;
            
            if(counter==n){
                for(let i=0; i<n; i++){
                    
                    resolves[i](params[i])
                }
            }
        })
    }
    
    for(let i=0; i<n; i++){
        funciones.push(func)
    }
    return funciones

}





var [f1, f2] = promiseBarrier(2);


Promise.resolve(1)
.then(f1)
.then(x => { console.log("c1 s1 b"); return x; })
.then(x => { console.log("c1 s2 b"); return x; })
Promise.resolve(2)
.then(x => { console.log("c2 s1 a"); return x; })
.then(x => { console.log("c2 s2 a"); return x; })
.then(x => { console.log("c2 s3 a"); return x; })
.then(x => { console.log("c2 s4 a"); return x; })
.then(f2)



//PROBLEMA 33

let PromisedPriorityQueue= function(){
    this.colaPromesas=[]
    this.resolveList=[]
    this.listaPrioritats=[]
    let contador=0;    
    this.decorate =(p,priority)=>{
        this.colaPromesas.push(p)
        this.listaPrioritats.push(priority)
        maxPriority = ()=>{
          let max_prio=0;
          for(var i=0; i<this.listaPrioritats.length; i++){
            if(this.listaPrioritats[i]> max_prio){
            
                max_prio=this.listaPrioritats[i]
            }
          }
          //se busca la promise con mas prioridad
          let indexPriority = this.listaPrioritats.indexOf(max_prio)
          q=this.colaPromesas[indexPriority]
          //la metemos a la lista de promises a resolver PISTA 1 
          this.resolveList.push(q)
          //borramos la prioridad de la lista
          this.listaPrioritats.splice(indexPriority,1)
          //devolvemos la promise
          
          return q
        }        
        return new Promise((resolve,rejects)=>{            
            
            contador++;
            //recursividad PISTA 2
            q=maxPriority()
            q.then(console.log)
            if(contador==this.colaPromesas.length){ 
              q.then(console.log)
                this.resolveList.forEach((element)=>{
                    element.then(console.log)
                })
              }
    
        })
    }
}


let ppq = new PromisedPriorityQueue()
p1 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(1)}, 1000)
})
p2 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(2)},2000)
})
p3 = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve(3)},3000)
})
q1 = ppq.decorate(p1,1).then(console.log)
q2 = ppq.decorate(p2,3).then(console.log)
q3 = ppq.decorate(p3,2).then(console.log)


