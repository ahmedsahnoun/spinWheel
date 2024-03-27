import { Wheel } from 'https://cdn.jsdelivr.net/npm/spin-wheel@4.3.1/dist/spin-wheel-esm.js';

// 1. Configure the wheel's properties:
let endSize = 1
let props = genProps(endSize)
let isSpinning = false
let launcher = null
const queue = []

// 2. Decide where you want it to go:
const container = document.getElementById("container");

// 3. Create the wheel in the container and initialise it with the props:
let wheel = null
generateWheel()

function genProps(endSize) {
	endSize = Math.min(99, endSize)
	return {
		items: [
			{
				label: '+30 Minutes',
				weight: 100 - endSize,
				backgroundColor: "#0066ff"
			},
			{
				label: endSize > 2 ? 'End' : '',
				weight: endSize,
				backgroundColor: "#ff0000"
			},
		]
	}
}

function onRestFunction(e) {
	if (wheel.rotation % 360 !== 0) {
		console.log(props.items[e.currentIndex].label)

		endSize++
		props = genProps(endSize)

		let nextRotation = Math.ceil(wheel.rotation / 360) * 360
		let cooldown = 1000

		setTimeout(() => {
			wheel.spinTo(nextRotation, cooldown)

			setTimeout(() => {
				wheel.remove()
				generateWheel()
				isSpinning = false
			}, cooldown * 2)

		}, cooldown);

	}
}

function generateWheel() {
	wheel = new Wheel(container, props);
	wheel.pointerAngle = 90
	wheel.onRest = onRestFunction
	wheel.overlayImage = "./overlay.png"
	window.wheel = wheel

	launcher = setInterval(() => {
		if (queue.length && !isSpinning) {
			queue.pop()
			isSpinning = true
			let speed = Math.floor(Math.random()*10000 + 1) * 5000
			console.log(speed)
			wheel.spin(speed)
			clearInterval(launcher)
		}
	}, 1000)
}

window.queue = queue
