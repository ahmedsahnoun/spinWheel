let localSocket = null
let reconnectTimer = null

function connectWebSocket() {
	console.log('Attempting to connect WebSocket...');
	localSocket = new WebSocket("ws://localhost:8766");

	localSocket.onopen = function (event) {
		console.log('WebSocket connection opened.');
		// Clear the reconnect timer if the connection is successful
		clearInterval(reconnectTimer);
		reconnectTimer = null;
	};

	localSocket.onclose = function (event) {
		console.log('WebSocket connection closed.');
		// Schedule a reconnect attempt after a delay
		if (!reconnectTimer) {
			reconnectTimer = setInterval(connectWebSocket, 2000);
		}
	};

	localSocket.onmessage = function (event) {
		if (event.data === "+30")
			addThirtyMinutes()
	};
}
connectWebSocket()
let countdownTime = 30 * 60; // Initial countdown time in seconds

function updateCountdown() {
	const hours = Math.floor(countdownTime / 3600);
	const minutes = Math.floor((countdownTime % 3600) / 60);
	const seconds = countdownTime % 60;
	document.getElementById('countdown').textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(number) {
	return (number < 10 ? '0' : '') + number;
}

function startCountdown() {
	setInterval(function () {
		if (countdownTime > 0) {
			countdownTime--;
			updateCountdown();
			if (countdownTime === 0) {
				countdownReachedZero();
			}
		}
	}, 1000); // Update every second (1000 milliseconds)
}

function addThirtyMinutes() {
	countdownTime += 30 * 60; // Add 30 minutes in seconds
	updateCountdown();
}

function countdownReachedZero() {
	localSocket.send("END")
}

window.onload = function () {
	updateCountdown();
	startCountdown();
};