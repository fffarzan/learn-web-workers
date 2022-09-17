(function App() {
	"use strict";

	var startStopBtn;
	var fibsList;
	var worker;

	document.addEventListener("DOMContentLoaded", ready);

	function ready() {
		startStopBtn = document.getElementById("start-stop-btn");
		fibsList = document.getElementById("fibs");
		startStopBtn.addEventListener("click", startFibs);
	}

	function renderFib(num, fib) {
		var div = document.createElement('div');
		div.innerText = `Fib(${num}): ${fib}`;
		fibsList.appendChild(div);
	}

	function startFibs() {
		startStopBtn.removeEventListener("click", startFibs);
		startStopBtn.addEventListener("click", stopFibs);
		startStopBtn.innerText = "Stop";
		fibsList.innerHTML = "";
		initWorker()
	}

	function initWorker() {
		worker = new Worker('/worker.js');
		worker.addEventListener('message', onMessage);
		worker.postMessage({ start: true })
	}

	function stopFibs() {
		startStopBtn.removeEventListener("click", stopFibs);
		startStopBtn.addEventListener("click", startFibs);
		startStopBtn.innerText = "Start";
		terminateWorker()
	}
	
	function terminateWorker() {
		worker.terminate();
	}

	function onMessage(event) {
		// console.log(event.data);
		// worker.postMessage('Hello from the client');
		renderFib(event.data.index, event.data.fib);
	}
})();
