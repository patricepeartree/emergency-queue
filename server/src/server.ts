import express, { Express } from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import { SocketService } from "./services";

import { connect } from "./repository/init-mongo";

const port = 8080; // TODO put this in an env variable

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

// connect to Mongo and bootstrap http server
connect(() => server.listen(port, () => console.log("Go ahead for server!")));
