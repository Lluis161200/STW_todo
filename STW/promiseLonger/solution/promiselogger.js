
// EXERCICI BACKEND

// 1- CACHING DECORATOR

let cachingDecorator = function(f) {

	let cache = {};

	return function(x) {
		if (x in cache) {
			return cache[x];
		} else {
			let p = f(x);
			cache[x] = p;
			return p;
		}
	}
}

{ // Tests

let f = x => Promise.resolve(x);
let g = cachingDecorator(f);

g(1).then(console.log);
g(2).then(console.log);
g(1).then(console.log);

let f2 = (x) => new Promise((resolve, reject) => setTimeout(() =>  {
	if (x % 2 == 1) {
		console.log("resolving to " + x);
		resolve(x)
	} else {
		console.log("rejecting to " + x);
		reject(x)
	}
}, 0));

let g2 = cachingDecorator(f2);

g2(1).then(msg => console.log("fulfilled " + msg), msg => console.log("rejected " + msg));
g2(2).then(msg => console.log("fulfilled " + msg), msg => console.log("rejected " + msg));
g2(1).then(msg => console.log("fulfilled " + msg), msg => console.log("rejected " + msg));
g2(2).then(msg => console.log("fulfilled " + msg), msg => console.log("rejected " + msg));
g2(1).then(msg => console.log("fulfilled " + msg), msg => console.log("rejected " + msg));

}

// 2- LOGGING DECORATOR

let loggingDecorator = function(f, p, r, e) {
	return function(x) {
		let pro = f(x);
		console.log(p + " (" + f.name + ")");
		pro.then(
			(res) => {console.log(r + " (" + f.name + ", resolved, " + res + ")");},
			(err) => {console.log(e + " (" + f.name + ", rejected, " + err + ")");},
		);
		return pro;
	}	
};

{ // Tests

let f = x => Promise.resolve(x);
let g = loggingDecorator(f, "a", "b", "c");

let f2 = x => new Promise((resolve, reject) => setTimeout(() => resolve(x), 50));
let f3 = x => new Promise((resolve, reject) => setTimeout(() => reject(x), 10));

let g2 = loggingDecorator(f2, "a2", "b2", "c2");
let g3 = loggingDecorator(f3, "a3", "b3", "c3");

g(1)
g2(2)
g3(3).catch(e => console.log("g3 rejected with " + e));

}


// 3- CONSOLE REPLACEMENT

(function() {

global_log = [ "Lorem ipsum dolor sit amet", "consectetur adipiscing elit", "sed do eiusmod tempor incididunt..." ];

let console2 = console;

console = {}

console.__proto__ = console2;

console.log = function(message) {
	global_log.push(message);
	console2.log(message);
}

})();

{ // Tests

console.assert(true);
console.log("hola");
console.log("adeu");
console.log(global_log);

}


/************************************ WEB SERVER ********************************/

const express = require('express');
const path = require('path');
const url = require('url');

const app = express();

app.use(express.static(path.join(__dirname, 'vue')));

app.get('/global_log', function (req, res) {
	console.log("Req /global_log");
	res.json(global_log.filter(x => x !== global_log));
});

setTimeout(() => app.listen(8080, () => console.log('Web Server Started at http://localhost:8080')), 50);


