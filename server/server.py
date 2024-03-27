import asyncio
import websockets
import psutil

countDown_client = None
start_server = None

def close_obs():
    for proc in psutil.process_iter(['pid', 'name']):
        if "obs64.exe" in proc.info['name']:  
            proc.kill()
            print("OBS Studio process terminated.")
            return

async def handle_message(websocket, path):
    global start_server
    start_server = websocket
    async for message in websocket:
        print(f"Received message: {message}")
        if(message == "+30"):
            if countDown_client:
                await countDown_client.send("+30")
        if(message == "END"):
            try:
                await start_server.close()
                await websocket.close()
            except:
                print("WebSocket connection is already closed.")
            close_obs()

async def handle_countdown_client(websocket, path):
    global countDown_client 
    countDown_client = websocket
    async for message in websocket:
        print(f"Received message from countdown client: {message}")
        if message == "END":
            try:
                await start_server.close()
                await websocket.close()
            except:
                print("WebSocket connection is already closed.")
            close_obs()


start_server = websockets.serve(handle_message, "localhost", 8765)
countDown_server = websockets.serve(handle_countdown_client, "localhost", 8766)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_until_complete(countDown_server)
asyncio.get_event_loop().run_forever()