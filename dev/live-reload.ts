import { Server } from "socket.io";
import fs from "fs";
import path from "path";

const port = parseInt(process.env.LIVE_RELOAD_PORT as string);

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
    io.emit("reload-page");
  });
});

io.listen(port);

console.log(`Listening on ws://localhost:${port}`);

fs.watchFile(
  path.resolve(__dirname, "../../../apps/front/public/styles.css"),
  { interval: 100 },
  () => {
    console.log("/styles.css changed => emitting reload style");
    setTimeout(() => io.emit("reload style", "/styles.css"), 100);
  },
);
