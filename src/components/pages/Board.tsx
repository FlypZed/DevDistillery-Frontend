import React, { useEffect, useRef, useState } from "react";
import BoardService from "../../services/BoardService";

const Board: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState("#000000");
	const [lineWidth, setLineWidth] = useState(5);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Configuración inicial del canvas
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;

		// Conectar al WebSocket
		const boardService = new BoardService();
		boardService.connect((message) => {
			const { type, payload } = message;

			if (type === "draw" && ctx) {
				const { x, y, prevX, prevY } = payload;
				ctx.beginPath();
				ctx.moveTo(prevX, prevY);
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		});

		// Eventos del mouse
		const startDrawing = (e: MouseEvent) => {
			setIsDrawing(true);
			const { offsetX, offsetY } = e;
			ctx?.moveTo(offsetX, offsetY);
		};

		const draw = (e: MouseEvent) => {
			if (!isDrawing || !ctx) return;

			const { offsetX, offsetY } = e;
			ctx.lineTo(offsetX, offsetY);
			ctx.stroke();

			// Enviar el dibujo al servidor
			boardService.sendDraw(offsetX, offsetY, offsetX, offsetY);
		};

		const stopDrawing = () => {
			setIsDrawing(false);
			ctx?.beginPath();
		};

		canvas.addEventListener("mousedown", startDrawing);
		canvas.addEventListener("mousemove", draw);
		canvas.addEventListener("mouseup", stopDrawing);
		canvas.addEventListener("mouseout", stopDrawing);

		return () => {
			canvas.removeEventListener("mousedown", startDrawing);
			canvas.removeEventListener("mousemove", draw);
			canvas.removeEventListener("mouseup", stopDrawing);
			canvas.removeEventListener("mouseout", stopDrawing);
		};
	}, [isDrawing, color, lineWidth]);

	return (
		<div>
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
				style={{ border: "1px solid black" }}
			/>
			<div>
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
				<input
					type="number"
					value={lineWidth}
					onChange={(e) => setLineWidth(Number(e.target.value))}
				/>
			</div>
		</div>
	);
};

export default Board;