import express, { Express } from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import variables from '../src/utils/environment'

import routes from './routes';
import { SocketService, AgendaService } from "./services";
import { initMongoConnection } from "./repository/init-mongo";

const port = variables.PORT; // FIXME env variable

const app: Express = express();
const server: Server = http.createServer(app);

// define express aplication

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cors

// app.use(cors({
//   origin: "http://localhost:3000",
// }));
app.use(cors());

// register our routes bellow the "/api" base route
app.use("/api", routes);

// initialize sockets
SocketService.initSocket(server);

// connect to Mongo, start Agenda and boot HTTP server
(async function bootServer() {
    const db = await initMongoConnection();
    await AgendaService.initAgenda(db);
    server.listen(port, () => console.log("Go ahead for server!"));
})();
