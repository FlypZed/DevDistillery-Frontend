class BoardService {
	private socket: WebSocket | null = null;

	connect(onMessage: (message: any) => void) {
		this.socket = new WebSocket("ws://localhost:8080/ws");

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			onMessage(message);
		};

		this.socket.onopen = () => {
			console.log("Connected to WebSocket");
		};

		this.socket.onclose = () => {
			console.log("Disconnected from WebSocket");
		};
	}

	sendDraw(x: number, y: number, prevX: number, prevY: number) {
		if (this.socket) {
			const message = {
				type: "draw",
				payload: { x, y, prevX, prevY },
			};
			this.socket.send(JSON.stringify(message));
		}
	}
}

export default BoardService;