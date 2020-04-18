
import SocketIO, { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

import { StatsService } from ".";


const UPDATE_STATS_INTERVAL = 1000;

let socketIOServer: SocketIOServer;

export function initSocket(httpServer: HttpServer) {
    socketIOServer = SocketIO(httpServer);

    socketIOServer.on('connection', (socket: Socket) => {
        console.log(`Channel ${socket.id} connected.`);
        socket.on("disconnect", () => {
            console.log(`Channel ${socket.id} disconnected.`)
        });
    });

    setInterval(emitUpdatedStats, UPDATE_STATS_INTERVAL);
}

async function emitUpdatedStats() {
    if (socketIOServer) {
        const stats = await StatsService.getSystemStats();
        socketIOServer.emit("stats", stats);
    }
}
