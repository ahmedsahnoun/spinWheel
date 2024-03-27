let socket = null
let giftedCounter = 0
function subscription(token) {
	if (socket) socket.close()

	socket = io('https://realtime.streamelements.com', {
		transports: ['websocket']
	});

	socket.on('connect', () => {
		console.log('Successfully connected to streamelemnt')
		socket.emit('authenticate', { method: 'jwt', token })
	})

	// socket.on('unauthorized', () => {
	// 	console.log("shit")
	// })

	socket.on('event', (data) => {
		if (data.type == 'subscriber') {
			giftedCounter++
			if (giftedCounter % 10 === 0) {
				queue.push(1)
			}
			console.log(giftedCounter)
		}
	});
}

export { subscription }
