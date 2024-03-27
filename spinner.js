import { Wheel } from 'https://cdn.jsdelivr.net/npm/spin-wheel@4.3.1/dist/spin-wheel-esm.js';
import *  as db from "./db.js"

const container = document.getElementById("container");
// const socket = new WebSocket("ws://localhost:8765");
const queue = []
const cooldown = 1000
let isSpinning = false
let props = {
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
		console.log(options[e.currentIndex])
		// socket.send(options[e.currentIndex])

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

window.queue = queue