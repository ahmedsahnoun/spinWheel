import { Wheel } from 'https://cdn.jsdelivr.net/npm/spin-wheel@4.3.1/dist/spin-wheel-esm.js';
import *  as db from "./db.js"

const container = document.getElementById("container");
let localSocket = null
let reconnectTimer = null;
const queue = []
const cooldown = 1000
let isSpinning = false
let props = {
	// itemLabelFont: "Helvetica",
	pointerAngle: 90,
	onRest: onRestFunction,
	overlayImage: "./overlay.png",
	items: [
		{
			label: '+30 Minutes',
			weight: 99,
			backgroundColor: "#0066ff"
		},
		{
			label: '',
			weight: 1,
			backgroundColor: "#ff0000"
		}
	]
}

const wheel = new Wheel(container, props);
window.wheel = wheel

const launcher = setInterval(() => {
	if (queue.length && !isSpinning && document.visibilityState === "visible") {
		queue.pop()
		isSpinning = true
		let newPostion = wheel.rotation + (Math.random() + 3) * 360
		wheel.spinTo(newPostion, 4000)
	}
}, cooldown)

function onRestFunction(e) {
	if (wheel.rotation % 360 !== 0) {
		const options = ['+30', 'END']
		if (localSocket.readyState === WebSocket.OPEN)
			localSocket.send(options[e.currentIndex])

		setTimeout(() => {
			if (wheel.items[1].weight < 100) {
				wheel.items[0].weight--
				wheel.items[1].weight++
				wheel.items[1].label = wheel.items[1].weight > 2 ? 'End' : ''
				isSpinning = false
			}
		}, cooldown)
	}
}

function connectWebSocket() {
	console.log('Attempting to connect WebSocket...');
	localSocket = new WebSocket("ws://localhost:8765");

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

	// localSocket.onerror = function (event) {
	// 	console.error('WebSocket error:', event);
	// 	// Handle errors as needed
	// };
}
connectWebSocket()

window.queue = queue