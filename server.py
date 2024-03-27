import asyncio
import websockets

async def handle_message(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")
        # Process the message here as needed

start_server = websockets.serve(handle_message, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()