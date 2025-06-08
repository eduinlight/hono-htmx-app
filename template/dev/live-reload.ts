import { Server } from "socket.io";

const port = Number.parseInt(process.env.LIVE_RELOAD_PORT as string);

const io = new Server();

io.on("connection", (socket) => {
	console.log("new client");

	socket.on("error", (err) => {
		console.log("socket error: ", err.message);
	});

	socket.on("disconnect", () => {
		console.log("client disconnected");
	});

	socket.on("server reloaded", async () => {
		console.log("server reloaded");
		io.emit("reload page");
	});

	socket.on("style reloaded", async (style) => {
		console.log("style reloaded");
		io.emit("reload style", style);
	});
});

io.listen(port);

console.log(`Listening on ws://localhost:${port}`);
