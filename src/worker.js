"use strict";

var self = this;
var currentFib = 0;

// this.postMessage('Hello from the web worker');
self.onmessage = onMessage;

function onMessage(event) {
	// console.log(`Received in web worker: ${event.data}`);
	getNextFib();
}

function getNextFib() {
	var fibNum = fib(currentFib)
	self.postMessage({ index: currentFib, fib: fibNum });
	currentFib++;
	setTimeout(getNextFib, 0);
}

function fib(n) {
	if (n < 2) {
		return n;
	}
	return fib(n - 1) + fib(n - 2);
}
